import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, price, image, category }) => {
  return (
    <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-full text-sm">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-zinc-400 text-sm mb-4">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-emerald-500 font-bold text-xl">{price} ₽</span>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300">
            <ShoppingCart className="w-5 h-5" />
            Купить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 