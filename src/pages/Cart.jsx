
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  Trash2, 
  Plus, 
  Minus,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-custom py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={28} className="text-gray-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/products">
              Start Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 hidden md:grid md:grid-cols-12 text-sm font-medium text-gray-500">
              <div className="md:col-span-6">Product</div>
              <div className="md:col-span-2 text-center">Price</div>
              <div className="md:col-span-2 text-center">Quantity</div>
              <div className="md:col-span-2 text-center">Total</div>
            </div>
            
            {/* Items */}
            <div className="divide-y divide-gray-100">
              {items.map(item => (
                <div key={item.id} className="px-6 py-4 md:grid md:grid-cols-12 md:items-center">
                  {/* Product */}
                  <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                    <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden mr-4 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        <Link 
                          to={`/products/${item.id}`}
                          className="hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-500">Category: {item.category}</p>
                      <button 
                        onClick={() => removeItem(item)}
                        className="text-red-500 text-sm flex items-center mt-1 hover:underline"
                      >
                        <Trash2 size={14} className="mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-2 text-gray-900 md:text-center mb-2 md:mb-0">
                    <div className="flex justify-between md:block">
                      <span className="md:hidden">Price:</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:col-span-2 md:text-center mb-2 md:mb-0">
                    <div className="flex justify-between items-center md:justify-center">
                      <span className="md:hidden">Quantity:</span>
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 border rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 border-t border-b text-center min-w-[2rem]">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 border rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="md:col-span-2 font-medium text-gray-900 md:text-center">
                    <div className="flex justify-between md:block">
                      <span className="md:hidden">Total:</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cart Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearCart}
                className="text-gray-600"
              >
                Clear Cart
              </Button>
              <Link to="/products" className="text-primary hover:underline text-sm">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {totalPrice >= 50 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${(4.99).toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${(totalPrice * 0.05).toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-100 my-4"></div>
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-xl">
                  ${(totalPrice + (totalPrice < 50 ? 4.99 : 0) + (totalPrice * 0.05)).toFixed(2)}
                </span>
              </div>
            </div>
            
            <Button 
              asChild
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Link to="/checkout">
                Proceed to Checkout
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            
            {/* Additional Info */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start text-sm text-gray-600">
                <CreditCard size={16} className="mr-2 flex-shrink-0 mt-0.5 text-gray-400" />
                <span>We accept all major credit cards, PayPal, and Apple Pay.</span>
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <ShieldCheck size={16} className="mr-2 flex-shrink-0 mt-0.5 text-gray-400" />
                <span>Your payment information is processed securely.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
