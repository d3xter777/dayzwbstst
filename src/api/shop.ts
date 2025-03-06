const API_URL = 'http://localhost:3001/api';

export interface Product {
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  image_path: string;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export const shopApi = {
  // Получение всех категорий
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error('Ошибка при получении категорий');
    }
    return response.json();
  },

  // Получение всех товаров
  async getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Ошибка при получении товаров');
    }
    return response.json();
  },

  // Получение товаров по категории
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products/category/${categoryId}`);
    if (!response.ok) {
      throw new Error('Ошибка при получении товаров по категории');
    }
    return response.json();
  },

  // Получение товара по ID
  async getProductById(id: number): Promise<Product | null> {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Ошибка при получении товара по ID');
    }
    return response.json();
  },

  // Создание нового товара
  async createProduct(productData: FormData): Promise<Product> {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      body: productData
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании товара');
    }

    return response.json();
  },

  // Обновление товара
  async updateProduct(id: number, productData: FormData): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      body: productData
    });

    if (!response.ok) {
      throw new Error('Ошибка при обновлении товара');
    }

    return response.json();
  },

  // Создание заказа
  async createOrder(userId: number, items: { productId: number; quantity: number }[]): Promise<number> {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, items }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании заказа');
    }

    const data = await response.json();
    return data.orderId;
  }
}; 