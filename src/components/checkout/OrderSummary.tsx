import React from 'react';
import { useCart } from '../../context/CartContext';
import { Ticket } from 'lucide-react';

export function OrderSummary() {
  const { state } = useCart();
  const totalEntries = state.items.reduce((acc, item) => acc + (item.entries * item.quantity), 0);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {state.items.map(item => (
          <div key={item.tags} className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-purple-200 mr-2">×{item.quantity}</span>
              <span>{item.tags} Key Tag{item.tags > 1 ? 's' : ''}</span>
            </div>
            <span>{item.price * item.quantity} MVR</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-white/20 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span>Subtotal</span>
          <span>{state.total} MVR</span>
        </div>
        <div className="flex justify-between items-center font-bold">
          <div className="flex items-center">
            <Ticket className="h-5 w-5 mr-2" />
            Total Entries
          </div>
          <span className="text-xl">{totalEntries}</span>
        </div>
      </div>
    </div>
  );
}