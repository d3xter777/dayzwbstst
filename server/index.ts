import express from 'express';
import cors from 'cors';
import pool from './config/db';
import upload from './config/upload';
import path from 'path';
import { Request, Response } from 'express';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../../public/images')));

// Получение всех категорий
app.get('/api/categories', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Получение всех товаров
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Получение товаров по категории
app.get('/api/products/category/:categoryId', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products WHERE category_id = ?', [req.params.categoryId]);
    res.json(rows);
  } catch (error) {
    console.error('Ошибка при получении товаров по категории:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Создание нового товара с изображением
app.post('/api/products', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, description, price, category_id, stock } = req.body;
    const image_path = req.file ? `/images/${req.file.filename}` : null;

    const [result] = await pool.query(
      'INSERT INTO products (name, description, price, category_id, stock, image_path) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, category_id, stock, image_path]
    );

    res.status(201).json({
      id: (result as any).insertId,
      name,
      description,
      price,
      category_id,
      stock,
      image_path
    });
  } catch (error) {
    console.error('Ошибка при создании товара:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Обновление товара с изображением
app.put('/api/products/:id', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, description, price, category_id, stock } = req.body;
    const image_path = req.file ? `/images/${req.file.filename}` : req.body.image_path;

    await pool.query(
      'UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, stock = ?, image_path = ? WHERE id = ?',
      [name, description, price, category_id, stock, image_path, req.params.id]
    );

    res.json({
      id: req.params.id,
      name,
      description,
      price,
      category_id,
      stock,
      image_path
    });
  } catch (error) {
    console.error('Ошибка при обновлении товара:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Создание заказа
app.post('/api/orders', async (req: Request, res: Response) => {
  const { userId, items } = req.body;
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // Подсчет общей суммы
    let totalAmount = 0;
    for (const item of items) {
      const [product] = await connection.query('SELECT price FROM products WHERE id = ?', [item.productId]);
      totalAmount += (product as any)[0].price * item.quantity;
    }

    // Создание заказа
    const [orderResult] = await connection.query(
      'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
      [userId, totalAmount]
    );
    const orderId = (orderResult as any).insertId;

    // Добавление товаров в заказ
    for (const item of items) {
      const [product] = await connection.query('SELECT price FROM products WHERE id = ?', [item.productId]);
      await connection.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.productId, item.quantity, (product as any)[0].price]
      );

      // Обновление количества товара на складе
      await connection.query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.productId]
      );
    }

    await connection.commit();
    res.json({ orderId });
  } catch (error) {
    await connection.rollback();
    console.error('Ошибка при создании заказа:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  } finally {
    connection.release();
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
}); 