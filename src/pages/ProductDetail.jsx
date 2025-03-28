
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  RotateCcw, 
  Shield, 
  Minus, 
  Plus, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network request with setTimeout
    setIsLoading(true);
    setTimeout(() => {
      const foundProduct = products.find(p => p.id.toString() === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        // Find related products (same category, excluding current product)
        const related = products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      // Add the product with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the product you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <ChevronRight size={16} className="mx-1" />
        <Link to="/products" className="hover:text-primary">Products</Link>
        <ChevronRight size={16} className="mx-1" />
        <Link to={`/categories/${product.category.toLowerCase()}`} className="hover:text-primary">
          {product.category}
        </Link>
        <ChevronRight size={16} className="mx-1" />
        <span className="text-gray-700 truncate">{product.name}</span>
      </div>

      {/* Back button */}
      <Link 
        to="/products" 
        className="inline-flex items-center text-primary hover:underline mb-6"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to all products
      </Link>
      
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover aspect-square"
          />
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          {/* Price & Rating */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={16}
                    className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">{product.rating} stars</span>
            </div>
            
            {product.stock <= 5 && (
              <span className="text-sm text-red-500">Only {product.stock} left in stock!</span>
            )}
          </div>
          
          {/* Description */}
          <p className="text-gray-700 mb-8">{product.description}</p>
          
          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-2 border rounded-l-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 border-t border-b text-center min-w-[3rem]">
                {quantity}
              </span>
              <button 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="p-2 border rounded-r-md bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
            
            <Button variant="outline" className="flex-1">
              <Heart size={18} className="mr-2" />
              Add to Wishlist
            </Button>
          </div>
          
          {/* Share */}
          <div className="flex items-center text-gray-500 mb-8">
            <Share2 size={16} className="mr-2" />
            <span className="text-sm">Share this product:</span>
            <div className="flex gap-2 ml-2">
              <button className="hover:text-primary" aria-label="Share on Facebook">FB</button>
              <button className="hover:text-primary" aria-label="Share on Twitter">TW</button>
              <button className="hover:text-primary" aria-label="Share on Pinterest">PIN</button>
            </div>
          </div>
          
          {/* Features */}
          <div className="space-y-3 border-t pt-6">
            <div className="flex items-center">
              <Truck size={18} className="mr-3 text-primary" />
              <span className="text-gray-700">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center">
              <RotateCcw size={18} className="mr-3 text-primary" />
              <span className="text-gray-700">30-day return policy</span>
            </div>
            <div className="flex items-center">
              <Shield size={18} className="mr-3 text-primary" />
              <span className="text-gray-700">Secure checkout</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
