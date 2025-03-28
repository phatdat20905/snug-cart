
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { id, name, price, image, rating, stock } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
      {/* Favorite button */}
      <button 
        className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm z-10 opacity-80 hover:opacity-100 transition-opacity"
        aria-label="Add to favorites"
      >
        <Heart size={16} className="text-gray-600 group-hover:text-red-500 transition-colors" />
      </button>

      {/* Product Image */}
      <Link to={`/products/${id}`} className="block">
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-medium text-gray-900 hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
          </div>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star size={14} className="fill-current text-yellow-400" />
              <span className="ml-1 text-sm text-gray-700">{rating}</span>
            </div>
            {stock <= 5 && (
              <span className="text-xs text-red-500 ml-2">Only {stock} left</span>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <span className="font-semibold text-gray-900">${price.toFixed(2)}</span>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="btn-primary rounded-full p-2 h-8 w-8"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
