import { useOrders } from './useOrders';
import { useNavigate } from 'react-router-dom';
import { Order } from '../types/order';

type SearchResult = {
  order: Order;
  section: 'pending' | 'approved' | 'rejected';
};

export function useGlobalSearch() {
  const navigate = useNavigate();
  const { orders } = useOrders();

  const searchOrders = (query: string): SearchResult[] => {
    if (!query?.trim()) {
      return [];
    }

    const searchQuery = query.toLowerCase().trim();
    
    return orders
      .map(order => {
        // Determine which section the order belongs to
        let section: 'pending' | 'approved' | 'rejected';
        if (order.approved) {
          section = 'approved';
        } else if (order.rejected) {
          section = 'rejected';
        } else {
          section = 'pending';
        }

        // Check if order matches search query
        const searchableFields = [
          order.firstName,
          order.lastName,
          order.email,
          order.idNumber,
          order.phone,
          `${order.firstName} ${order.lastName}`,
          ...(order.entryCodes || [])
        ];

        const matches = searchableFields.some(field =>
          field?.toLowerCase().includes(searchQuery)
        );

        return matches ? { order, section } : null;
      })
      .filter((result): result is SearchResult => result !== null);
  };

  const navigateToResult = (result: SearchResult) => {
    const path = `/admin/${result.section}`;
    navigate(path, { state: { highlightOrder: result.order.id } });
  };

  return {
    searchOrders,
    navigateToResult
  };
}