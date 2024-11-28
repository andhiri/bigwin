import React from 'react';
import { Upload } from 'lucide-react';
import { FormData, FormErrors } from './types';

type Props = {
  formData: FormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'transfer') => void;
  idPhoto: File | null;
};

export function PersonalInfo({ formData, errors, onChange, onFileChange, idPhoto }: Props) {
  const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove any non-digit characters after 'A'
    const digits = value.slice(1).replace(/\D/g, '');
    // Limit to 6 digits
    const truncated = digits.slice(0, 6);
    // Always start with 'A'
    const formattedValue = `A${truncated}`;
    
    onChange({
      ...e,
      target: {
        ...e.target,
        name: 'idNumber',
        value: formattedValue
      }
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Personal Information *</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.email}
            onChange={onChange}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              +960
            </span>
            <input
              type="tel"
              name="phone"
              required
              placeholder="777XXXX"
              className={`w-full pl-16 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formData.phone}
              onChange={onChange}
              maxLength={7}
              pattern="[0-9]{7}"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            required
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.firstName}
            onChange={onChange}
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            required
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.lastName}
            onChange={onChange}
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID Number *
          </label>
          <input
            type="text"
            name="idNumber"
            required
            placeholder="A123456"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              errors.idNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.idNumber}
            onChange={handleIdNumberChange}
            maxLength={7}
          />
          {errors.idNumber && <p className="mt-1 text-sm text-red-500">{errors.idNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID Photo *
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => onFileChange(e, 'id')}
              className="hidden"
              id="id-photo"
            />
            <label
              htmlFor="id-photo"
              className={`w-full px-4 py-2 border rounded-lg cursor-pointer flex items-center justify-center space-x-2 ${
                idPhoto 
                  ? 'bg-green-50 border-green-500' 
                  : errors.idPhoto 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Upload className={`h-5 w-5 ${
                idPhoto 
                  ? 'text-green-500' 
                  : errors.idPhoto 
                    ? 'text-red-500' 
                    : 'text-gray-400'
              }`} />
              <span className={`text-sm ${
                idPhoto 
                  ? 'text-green-600' 
                  : errors.idPhoto 
                    ? 'text-red-500' 
                    : 'text-gray-600'
              }`}>
                {idPhoto ? idPhoto.name : 'Upload ID Photo'}
              </span>
            </label>
            {errors.idPhoto && (
              <p className="mt-1 text-sm text-red-500">{errors.idPhoto}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}