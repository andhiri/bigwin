import React from 'react';
import { Eye, CheckCircle, X } from 'lucide-react';
import { Order } from '../../types/order';

type Props = {
  orders: Order[];
  onApprove: (orderId: string) => void;
  onReject: (orderId: string) => void;
  onViewDetails: (order: Order) => void;
  showActions?: boolean;
};

export function OrderList({ orders, onApprove, onReject, onViewDetails, showActions = true }: Props) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No orders found for this promotion.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm text-gray-600">
                    {order.id.slice(0, 8)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.firstName} {order.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.idNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onViewDetails(order)}
                    className="text-purple-600 hover:text-purple-900"
                  >
                    View Receipt
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onViewDetails(order)}
                      className="p-1 text-gray-400 hover:text-purple-600"
                      title="View Details"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    {showActions && (
                      <>
                        <button
                          onClick={() => onApprove(order.id)}
                          className="p-1 text-gray-400 hover:text-green-600"
                          title="Approve"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => onReject(order.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Reject"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}