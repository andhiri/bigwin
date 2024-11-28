import { useState, useEffect, useMemo } from 'react';
import { Order } from '../types/order';
import { generateEntryCode } from '../utils/generateEntryCode';

function generateMockOrders(): Order[] {
  return [
    {
      id: '1',
      promotionId: 'iphone-16-pro-max',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '7771234',
      idNumber: 'A123456',
      address: '123 Main St',
      city: 'Male',
      country: 'Maldives',
      paymentMethod: 'bank',
      total: 120,
      entryCodes: [generateEntryCode('iphone-16-pro-max')],
      idPhotoFilename: 'mock-id.jpg',
      transferSlipFilename: 'mock-slip.jpg',
      approved: false,
      rejected: false,
      createdAt: new Date().toISOString()
    }
  ];
}

export function useOrders(promotionId: string = 'iphone-16-pro-max', searchQuery: string = '') {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize orders on mount
  useEffect(() => {
    const initializeOrders = () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const storedOrders = localStorage.getItem('orders');
        let initialOrders: Order[];

        if (storedOrders) {
          initialOrders = JSON.parse(storedOrders);
          if (!Array.isArray(initialOrders)) {
            throw new Error('Invalid orders data format');
          }
        } else {
          initialOrders = generateMockOrders();
          localStorage.setItem('orders', JSON.stringify(initialOrders));
        }

        setOrders(initialOrders);
      } catch (error) {
        console.error('Error initializing orders:', error);
        setError('Failed to load orders');
        setOrders(generateMockOrders());
      } finally {
        setIsLoading(false);
      }
    };

    initializeOrders();
  }, []);

  // Memoize filtered orders with proper error handling
  const filteredOrders = useMemo(() => {
    try {
      if (!Array.isArray(orders)) {
        return [];
      }

      return orders.filter(order => {
        try {
          // First filter by promotion
          if (order.promotionId !== promotionId) {
            return false;
          }

          // If no search query, return all orders for the promotion
          if (!searchQuery?.trim()) {
            return true;
          }

          // Case-insensitive search
          const query = searchQuery.toLowerCase().trim();
          
          // Safely access and search across multiple fields
          const searchableFields = [
            order.firstName,
            order.lastName,
            order.email,
            order.idNumber,
            order.phone,
            `${order.firstName} ${order.lastName}`,
            ...(Array.isArray(order.entryCodes) ? order.entryCodes : [])
          ].filter(Boolean);

          return searchableFields.some(field => 
            field?.toLowerCase().includes(query)
          );
        } catch (error) {
          console.error('Error filtering order:', error);
          return false;
        }
      });
    } catch (error) {
      console.error('Error filtering orders:', error);
      return [];
    }
  }, [orders, promotionId, searchQuery]);

  // Memoize categorized orders with error handling
  const { pendingOrders, approvedOrders, rejectedOrders } = useMemo(() => {
    try {
      if (!Array.isArray(filteredOrders)) {
        return {
          pendingOrders: [],
          approvedOrders: [],
          rejectedOrders: []
        };
      }

      return {
        pendingOrders: filteredOrders.filter(order => !order.approved && !order.rejected),
        approvedOrders: filteredOrders.filter(order => order.approved),
        rejectedOrders: filteredOrders.filter(order => order.rejected)
      };
    } catch (error) {
      console.error('Error categorizing orders:', error);
      return {
        pendingOrders: [],
        approvedOrders: [],
        rejectedOrders: []
      };
    }
  }, [filteredOrders]);

  const approveOrder = async (orderId: string) => {
    try {
      setOrders(prev => {
        const updated = prev.map(order =>
          order.id === orderId
            ? { ...order, approved: true, rejected: false }
            : order
        );
        localStorage.setItem('orders', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error approving order:', error);
      setError('Failed to approve order');
    }
  };

  const rejectOrder = async (orderId: string) => {
    try {
      setOrders(prev => {
        const updated = prev.map(order =>
          order.id === orderId
            ? { ...order, approved: false, rejected: true }
            : order
        );
        localStorage.setItem('orders', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Error rejecting order:', error);
      setError('Failed to reject order');
    }
  };

  return {
    orders: filteredOrders,
    pendingOrders,
    approvedOrders,
    rejectedOrders,
    approveOrder,
    rejectOrder,
    isLoading,
    error
  };
}