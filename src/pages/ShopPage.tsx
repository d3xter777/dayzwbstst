import React, { useState, useEffect } from 'react';
import { ShoppingCart, Filter } from 'lucide-react';
import { shopApi, Product, Category } from '../api/shop';

// Создаем объект с маппингом изображений
const productImages: { [key: string]: string } = {
  'AKM': '/images/akm.jpg',
  'M4A1': '/images/m4a1.jpg',
  'SVD': '/images/svd.jpg',
  'MP5': '/images/mp5.jpg',
  'Тактический жилет': '/images/vest.jpg',
  'Шлем': '/images/helmet.jpg',
  'Бронежилет': '/images/armor.jpg',
  'Тактические перчатки': '/images/gloves.jpg',
  'Аптечка': '/images/medkit.jpg',
  'Рюкзак': '/images/backpack.jpg',
  'Компас': '/images/compass.jpg',
  'Фонарик': '/images/flashlight.jpg',
  'Консервы': '/images/cans.jpg',
  'Вода': '/images/water.jpg',
  'Сухой паек': '/images/ration.jpg',
  'Энергетический батончик': '/images/energy.jpg',
  'Бинты': '/images/bandages.jpg',
  'Обезболивающее': '/images/painkillers.jpg',
  'Антибиотики': '/images/antibiotics.jpg',
  'Витамины': '/images/vitamins.jpg',
  'GPS навигатор': '/images/gps.jpg',
  'Рация': '/images/radio.jpg',
  'Ночное видение': '/images/nvg.jpg',
  'Бинокль': '/images/binoculars.jpg'
};

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Начинаем загрузку данных...');
        const [categoriesData, productsData] = await Promise.all([
          shopApi.getCategories(),
          shopApi.getProducts()
        ]);
        console.log('Полученные категории:', categoriesData);
        console.log('Полученные продукты:', productsData);
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error: any) {
        console.error('Ошибка при загрузке данных:', error);
        console.error('Детали ошибки:', {
          message: error.message,
          stack: error.stack
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category_id === selectedCategory)
    : products;

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === Number(productId));
      return total + (product?.price || 0) * quantity;
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      const items = Object.entries(cart).map(([productId, quantity]) => ({
        productId: Number(productId),
        quantity
      }));

      // Здесь должна быть логика авторизации пользователя
      const userId = 1; // Временное решение
      await shopApi.createOrder(userId, items);
      
      // Очищаем корзину после успешного оформления заказа
      setCart({});
      setIsCartOpen(false);
      alert('Заказ успешно оформлен!');
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      alert('Произошла ошибка при оформлении заказа');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-zinc-400">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-zinc-100">Магазин</h1>
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="flex items-center space-x-2 text-zinc-100 hover:text-emerald-500 transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="bg-emerald-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            {Object.values(cart).reduce((a, b) => a + b, 0)}
          </span>
        </button>
      </div>

      {/* Фильтры */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-zinc-400" />
          <h2 className="text-lg font-semibold text-zinc-100">Фильтры</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === null
                ? 'bg-emerald-500 text-white'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
            }`}
          >
            Все
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Список товаров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          const category = categories.find(c => c.id === product.category_id);
          const imageUrl = productImages[product.name] || '';
          return (
            <div key={product.id} className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-sm">
                  {category?.name || 'Без категории'}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-zinc-400 text-sm mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-emerald-500 font-bold text-xl">{product.price} $</span>
                  <button 
                    onClick={() => addToCart(product.id)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Купить
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Корзина */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Корзина</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {Object.entries(cart).length === 0 ? (
              <p className="text-zinc-400 text-center">Корзина пуста</p>
            ) : (
              <>
                {Object.entries(cart).map(([productId, quantity]) => {
                  const product = products.find(p => p.id === Number(productId));
                  return (
                    <div key={productId} className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-white">{product?.name}</h3>
                        <p className="text-zinc-400 text-sm">{product?.price} $ × {quantity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(Number(productId))}
                          className="text-zinc-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="text-white">{quantity}</span>
                        <button
                          onClick={() => addToCart(Number(productId))}
                          className="text-zinc-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
                
                <div className="border-t border-zinc-700 mt-4 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-bold">Итого:</span>
                    <span className="text-emerald-500 font-bold text-xl">{getCartTotal()} $</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition-colors duration-300"
                  >
                    Оформить заказ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;