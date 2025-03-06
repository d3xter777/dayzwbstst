-- Создание базы данных
CREATE DATABASE IF NOT EXISTS dreadsky_shop;
USE dreadsky_shop;

-- Таблица категорий
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица товаров
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Таблица заказов
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица деталей заказа
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Вставка тестовых данных
INSERT INTO categories (name, description) VALUES
('Оружие', 'Различные типы оружия для выживания'),
('Броня', 'Защитное снаряжение'),
('Предметы', 'Полезные предметы для выживания'),
('Еда и вода', 'Продукты питания и вода'),
('Медикаменты', 'Медицинские принадлежности'),
('Электроника', 'Электронные устройства и аксессуары');

-- Вставка тестовых товаров
INSERT INTO products (category_id, name, description, price, stock) VALUES
-- Оружие
(1, 'AKM', 'Автомат Калашникова модернизированный', 999.99, 10),
(1, 'M4A1', 'Штурмовая винтовка M4A1', 1299.99, 8),
(1, 'SVD', 'Снайперская винтовка Драгунова', 1499.99, 5),
(1, 'MP5', 'Пистолет-пулемет MP5', 799.99, 12),

-- Броня
(2, 'Тактический жилет', 'Защитный жилет с карманами', 499.99, 15),
(2, 'Шлем', 'Баллистический шлем', 399.99, 12),
(2, 'Бронежилет', 'Тяжелый бронежилет', 699.99, 8),
(2, 'Тактические перчатки', 'Защитные перчатки', 199.99, 20),

-- Предметы
(3, 'Аптечка', 'Медицинская аптечка первой помощи', 199.99, 20),
(3, 'Рюкзак', 'Вместительный рюкзак', 299.99, 10),
(3, 'Компас', 'Навигационный компас', 149.99, 15),
(3, 'Фонарик', 'Тактический фонарик', 89.99, 25),

-- Еда и вода
(4, 'Консервы', 'Набор консервов', 149.99, 30),
(4, 'Вода', 'Бутылка воды', 49.99, 50),
(4, 'Сухой паек', 'Армейский сухой паек', 299.99, 20),
(4, 'Энергетический батончик', 'Высококалорийный батончик', 79.99, 40),

-- Медикаменты
(5, 'Бинты', 'Стерильные бинты', 89.99, 30),
(5, 'Обезболивающее', 'Болеутоляющие таблетки', 129.99, 25),
(5, 'Антибиотики', 'Антибактериальные препараты', 199.99, 15),
(5, 'Витамины', 'Комплекс витаминов', 159.99, 20),

-- Электроника
(6, 'GPS навигатор', 'Портативный GPS', 599.99, 8),
(6, 'Рация', 'Тактическая рация', 399.99, 12),
(6, 'Ночное видение', 'Прибор ночного видения', 1299.99, 5),
(6, 'Бинокль', 'Военный бинокль', 299.99, 10); 