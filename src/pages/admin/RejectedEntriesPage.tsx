import React, { useState } from 'react';
import { OrderList } from '../../components/admin/OrderList';
import { OrderDetails } from '../../components/admin/OrderDetails';
import { SearchBar } from '../../components/admin/SearchBar';
import { PromotionSelector } from '../../components/admin/PromotionSelector';
import { useOrders } from '../../hooks/useOrders';
import { usePromotions } from '../../hooks/usePromotions';
import { Order } from '../../types/order';

export function RejectedEntriesPage() {
  const { selectedPromotion } = usePromotions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const { rejectedOrders, approveOrder } = useOrders(selectedPromotion, searchQuery);

  const handleApprove = async (orderId: string) => {
    await approveOrder(orderId);
  };

  return (
    <div className="space-y-6">
      <PromotionSelector />
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Rejected Entries</h2>
        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
          {rejectedOrders.length} Rejected
        </span>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <OrderList
        orders={rejectedOrders}
        onApprove={handleApprove}
        onReject={() => {}}
        onViewDetails={(order) => setSelectedOrder(order)}
        showActions={true}
      />

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}