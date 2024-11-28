import React, { useState } from 'react';
import { OrderList } from '../../components/admin/OrderList';
import { OrderDetails } from '../../components/admin/OrderDetails';
import { SearchBar } from '../../components/admin/SearchBar';
import { PromotionSelector } from '../../components/admin/PromotionSelector';
import { useOrders } from '../../hooks/useOrders';
import { usePromotions } from '../../hooks/usePromotions';
import { Order } from '../../types/order';

export function ApprovedEntriesPage() {
  const { selectedPromotion } = usePromotions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const { approvedOrders, rejectOrder } = useOrders(selectedPromotion, searchQuery);

  const handleReject = async (orderId: string) => {
    await rejectOrder(orderId);
  };

  return (
    <div className="space-y-6">
      <PromotionSelector />
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Approved Entries</h2>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          {approvedOrders.length} Approved
        </span>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <OrderList
        orders={approvedOrders}
        onApprove={() => {}}
        onReject={handleReject}
        onViewDetails={(order) => setSelectedOrder(order)}
        showActions={false}
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