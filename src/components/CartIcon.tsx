import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartIcon() {
  const { state } = useCart();
  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative">
      <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-purple-600 transition-colors" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
}