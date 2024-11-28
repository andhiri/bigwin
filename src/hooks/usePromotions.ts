import { useState } from 'react';
import { Promotion } from '../types/promotion';

const mockPromotions: Promotion[] = [
  {
    id: 'iphone-16-pro-max',
    title: 'iPhone 16 Pro Max',
    description: 'Win the latest iPhone with revolutionary features!',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    active: true,
  },
  {
    id: 'macbook-pro-2024',
    title: 'MacBook Pro 2024',
    description: 'Win a powerful MacBook Pro!',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    active: false,
  }
];

export function usePromotions() {
  const [promotions] = useState<Promotion[]>(mockPromotions);
  const [selectedPromotion, setSelectedPromotion] = useState<string>(mockPromotions[0].id);

  const selectPromotion = (promotionId: string) => {
    setSelectedPromotion(promotionId);
  };

  return {
    promotions,
    selectedPromotion,
    selectPromotion,
  };
}