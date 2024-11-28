import React from 'react';
import { Gift } from 'lucide-react';
import { usePromotions } from '../../hooks/usePromotions';

export function PromotionSelector() {
  const { promotions, selectedPromotion, selectPromotion } = usePromotions();

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <Gift className="h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-medium text-gray-900">Select Promotion</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {promotions.map((promotion) => (
          <button
            key={promotion.id}
            onClick={() => selectPromotion(promotion.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedPromotion === promotion.id
                ? 'border-purple-600 bg-purple-50'
                : 'border-gray-200 hover:border-purple-200'
            }`}
          >
            <div className="aspect-video rounded-lg overflow-hidden mb-3">
              <img
                src={promotion.imageUrl}
                alt={promotion.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-medium text-gray-900">{promotion.title}</h4>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(promotion.startDate).toLocaleDateString()} - {new Date(promotion.endDate).toLocaleDateString()}
            </p>
            <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
              promotion.active
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {promotion.active ? 'Active' : 'Upcoming'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}