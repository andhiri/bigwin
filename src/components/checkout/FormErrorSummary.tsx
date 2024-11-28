import React from 'react';
import { AlertCircle } from 'lucide-react';
import { FormErrors } from './types';

type Props = {
  errors: FormErrors;
};

export function FormErrorSummary({ errors }: Props) {
  if (Object.keys(errors).length === 0) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
        <div>
          <h3 className="text-sm font-medium text-red-800 mb-2">
            Please fix the following errors:
          </h3>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}