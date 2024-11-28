import React, { useState } from 'react';
import { OrderList } from '../../components/admin/OrderList';
import { OrderDetails } from '../../components/admin/OrderDetails';
import { SearchBar } from '../../components/admin/SearchBar';
import { PromotionSelector } from '../../components/admin/PromotionSelector';
import { useOrders } from '../../hooks/useOrders';
import { usePromotions } from '../../hooks/usePromotions';
import { Order } from '../../types/order';
import { Loader } from 'lucide-react';

export function PendingOrdersPage() {
  const { selectedPromotion } = usePromotions();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const { pendingOrders, approveOrder, rejectOrder, isLoading } = useOrders(selectedPromotion, searchQuery);

  const handleApprove = async (orderId: string) => {
    await approveOrder(orderId);
  };

  const handleReject = async (orderId: string) => {
    await rejectOrder(orderId);
  };

  return (
    <div className="space-y-6">
      <PromotionSelector />
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Pending Orders</h2>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          {isLoading ? '...' : `${pendingOrders.length} Pending`}
        </span>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="h-8 w-8 text-purple-600 animate-spin" />
        </div>
      ) : (
        <OrderList
          orders={pendingOrders}
          onApprove={handleApprove}
          onReject={handleReject}
          onViewDetails={(order) => setSelectedOrder(order)}
          showActions={true}
        />
      )}

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}