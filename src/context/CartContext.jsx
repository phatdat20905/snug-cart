
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'sonner';

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
      } else {
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + action.payload.price,
      };
    }
    case 'REMOVE_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        const item = state.items[existingItemIndex];
        const updatedItems = state.items.filter((item) => item.id !== action.payload.id);

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - (item.price * item.quantity),
        };
      }
      return state;
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === id);
      
      if (existingItemIndex >= 0) {
        const item = state.items[existingItemIndex];
        const quantityDiff = quantity - item.quantity;
        
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...item,
          quantity,
        };

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + quantityDiff,
          totalPrice: state.totalPrice + (item.price * quantityDiff),
        };
      }
      return state;
    }
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  // Initialize from localStorage if available
  const getInitialState = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : initialState;
  };

  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  // Add item to cart
  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast.success(`${product.name} added to cart`);
  };

  // Remove item from cart
  const removeItem = (product) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
    toast.info(`${product.name} removed from cart`);
  };

  // Update quantity of an item
  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  // Clear the cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.info('Cart cleared');
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
