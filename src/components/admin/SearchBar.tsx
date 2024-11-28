import React, { useState, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '../../hooks/useClickOutside';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { orders } = useOrders();

  useClickOutside(searchRef, () => setIsOpen(false));

  const getSearchResults = () => {
    if (!value?.trim()) return [];

    const query = value.toLowerCase().trim();
    return orders
      .map(order => {
        // Determine section
        let section: 'pending' | 'approved' | 'rejected';
        if (order.approved) {
          section = 'approved';
        } else if (order.rejected) {
          section = 'rejected';
        } else {
          section = 'pending';
        }

        // Search across all fields
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
          field?.toLowerCase().includes(query)
        );

        return matches ? { order, section } : null;
      })
      .filter(Boolean);
  };

  const results = getSearchResults();

  const handleResultClick = (result: any) => {
    navigate(`/admin/${result.section}`);
    setIsOpen(false);
  };

  const getSectionBadge = (section: string) => {
    switch (section) {
      case 'pending':
        return <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'approved':
        return <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">Approved</span>;
      case 'rejected':
        return <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by Entry Code, Name, Email, or ID..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        {value && (
          <button
            onClick={() => {
              onChange('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {isOpen && value && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          {results.map((result: any, index: number) => (
            <button
              key={`${result.order.id}-${index}`}
              onClick={() => handleResultClick(result)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 border-b last:border-b-0"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">
                    {result.order.firstName} {result.order.lastName}
                  </span>
                  {getSectionBadge(result.section)}
                </div>
                <div className="text-sm text-gray-500 flex items-center space-x-2">
                  <span>{result.order.email}</span>
                  <span>•</span>
                  <span>ID: {result.order.idNumber}</span>
                </div>
                {result.order.entryCodes?.length > 0 && (
                  <div className="mt-1 text-xs font-mono text-purple-600">
                    {result.order.entryCodes[0]}
                    {result.order.entryCodes.length > 1 && ` +${result.order.entryCodes.length - 1} more`}
                  </div>
                )}
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 ml-4" />
            </button>
          ))}
        </div>
      )}

      {isOpen && value && results.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
}