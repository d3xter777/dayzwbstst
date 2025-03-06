import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root'
};

async function resetDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Подключено к MySQL');

    // Удаляем базу данных если она существует
    await connection.query('DROP DATABASE IF EXISTS dreadsky_shop');
    console.log('База данных удалена');

    // Создаем базу данных заново
    await connection.query('CREATE DATABASE dreadsky_shop');
    console.log('База данных создана');

    // Используем базу данных
    await connection.query('USE dreadsky_shop');
    console.log('База данных выбрана');

    // Читаем и выполняем SQL-скрипт
    const fs = await import('fs');
    const path = await import('path');
    const { fileURLToPath } = await import('url');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const sqlScript = fs.readFileSync(
      path.join(__dirname, '../database/schema.sql'),
      'utf8'
    );

    // Разделяем скрипт на части: создание таблиц и вставка данных
    const parts = sqlScript.split('-- Вставка тестовых данных');
    const createTablesScript = parts[0];
    const insertDataScript = parts[1];

    // Сначала создаем таблицы
    const createQueries = createTablesScript
      .split(';')
      .map(query => query.trim())
      .filter(query => query.length > 0);

    for (const query of createQueries) {
      await connection.query(query);
      console.log('Выполнен запрос создания таблицы:', query.substring(0, 50) + '...');
    }

    // Отключаем проверку внешних ключей
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Очищаем таблицы в правильном порядке
    await connection.query('TRUNCATE TABLE order_items');
    await connection.query('TRUNCATE TABLE orders');
    await connection.query('TRUNCATE TABLE products');
    await connection.query('TRUNCATE TABLE categories');
    
    // Включаем проверку внешних ключей
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('Таблицы очищены');

    // Затем вставляем данные
    const insertQueries = insertDataScript
      .split(';')
      .map(query => query.trim())
      .filter(query => query.length > 0);

    for (const query of insertQueries) {
      await connection.query(query);
      console.log('Выполнен запрос вставки данных:', query.substring(0, 50) + '...');
    }

    console.log('База данных успешно сброшена и инициализирована');
  } catch (error) {
    console.error('Ошибка при сбросе базы данных:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

resetDatabase(); 