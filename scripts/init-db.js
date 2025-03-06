import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root'
};

async function initDatabase() {
  let connection;
  try {
    // Создаем подключение без указания базы данных
    connection = await mysql.createConnection(dbConfig);
    console.log('Подключено к MySQL');

    // Читаем SQL-скрипт
    const sqlScript = fs.readFileSync(
      path.join(__dirname, '../database/schema.sql'),
      'utf8'
    );

    // Разбиваем скрипт на отдельные запросы
    const queries = sqlScript
      .split(';')
      .map(query => query.trim())
      .filter(query => query.length > 0);

    // Выполняем каждый запрос
    for (const query of queries) {
      await connection.query(query);
      console.log('Выполнен запрос:', query.substring(0, 50) + '...');
    }

    console.log('База данных успешно инициализирована');
  } catch (error) {
    console.error('Ошибка при инициализации базы данных:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initDatabase(); 