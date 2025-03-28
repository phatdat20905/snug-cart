
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CheckoutSuccess = () => {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="container-custom py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle size={64} className="text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        
        <p className="text-lg text-gray-700 mb-6">
          Thank you for your purchase. Your order has been received and is now being processed.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <p className="text-gray-600 mb-2">Order Number:</p>
          <p className="text-xl font-bold text-gray-900">{orderNumber}</p>
        </div>
        
        <p className="text-gray-600 mb-8">
          We've sent a confirmation email with your order details and tracking information.
          You can also view your order status in your account dashboard.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/products">
              Continue Shopping
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/account/orders">
              View My Orders
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
