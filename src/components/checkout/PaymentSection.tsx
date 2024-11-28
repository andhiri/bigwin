import React from 'react';
import { Upload, CreditCard } from 'lucide-react';
import { FormData, FormErrors } from './types';

type Props = {
  formData: FormData;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'transfer') => void;
  transferSlip: File | null;
};

export function PaymentSection({ formData, errors, onChange, onFileChange, transferSlip }: Props) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Payment *</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="bank-transfer"
            name="paymentMethod"
            value="bank"
            checked={formData.paymentMethod === 'bank'}
            onChange={onChange}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500"
          />
          <label htmlFor="bank-transfer" className="text-sm font-medium text-gray-700">
            Bank Transfer
          </label>
        </div>
        
        {formData.paymentMethod === 'bank' && (
          <div className="ml-7 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800">Bank Account Details:</p>
              <p className="text-gray-600">Account Number: 7730000XX1234</p>
              <p className="text-gray-600">Account Name: BIGWIN MALDIVES</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Transfer Slip *
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => onFileChange(e, 'transfer')}
                  className="hidden"
                  id="transfer-slip"
                />
                <label
                  htmlFor="transfer-slip"
                  className={`w-full px-4 py-2 border rounded-lg cursor-pointer flex items-center justify-center space-x-2 ${
                    transferSlip 
                      ? 'bg-green-50 border-green-500' 
                      : errors.transferSlip 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Upload className={`h-5 w-5 ${
                    transferSlip 
                      ? 'text-green-500' 
                      : errors.transferSlip 
                        ? 'text-red-500' 
                        : 'text-gray-400'
                  }`} />
                  <span className={`text-sm ${
                    transferSlip 
                      ? 'text-green-600' 
                      : errors.transferSlip 
                        ? 'text-red-500' 
                        : 'text-gray-600'
                  }`}>
                    {transferSlip ? transferSlip.name : 'Upload Transfer Slip'}
                  </span>
                </label>
                {errors.transferSlip && (
                  <p className="mt-1 text-sm text-red-500">{errors.transferSlip}</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="bml-gateway"
            name="paymentMethod"
            value="bml"
            checked={formData.paymentMethod === 'bml'}
            onChange={onChange}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500"
          />
          <label htmlFor="bml-gateway" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
            <span>BML Payment Gateway</span>
            <CreditCard className="h-5 w-5 text-gray-400" />
          </label>
        </div>
      </div>
    </div>
  );
}