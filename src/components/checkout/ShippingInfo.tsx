import React from 'react';
import { Building2 } from 'lucide-react';
import { FormData, FormErrors } from './types';

type Props = {
  formData: FormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function ShippingInfo({ formData, errors, onChange }: Props) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Shipping/Post *</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <input
            type="text"
            name="address"
            required
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.address}
            onChange={onChange}
          />
          {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apartment No.
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="apartmentNo"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.apartmentNo}
              onChange={onChange}
              placeholder="e.g., 4A"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <input
            type="text"
            name="city"
            required
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.city}
            onChange={onChange}
          />
          {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country *
          </label>
          <input
            type="text"
            name="country"
            required
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            value={formData.country}
          />
        </div>
      </div>
    </div>
  );
}