import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Copy, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Order } from '../../types/order';

type Props = {
  order: Order;
  onClose: () => void;
};

export function SuccessModal({ order, onClose }: Props) {
  const [showAllCodes, setShowAllCodes] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    const modal = document.getElementById('success-modal');
    const modalContent = document.getElementById('success-modal-content');
    if (modal && modalContent && !modalContent.contains(e.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const copyEntryCodes = async () => {
    try {
      await navigator.clipboard.writeText(order.entryCodes.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const displayedCodes = showAllCodes ? order.entryCodes : order.entryCodes.slice(0, 3);

  return (
    <div 
      id="success-modal"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div 
        id="success-modal-content"
        className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-scale-up"
      >
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Order Submitted Successfully!</h3>
            <p className="text-sm text-gray-600 mb-6">
              Thank you for your purchase! Your order has been submitted for approval. 
              Please save your entry codes for reference.
            </p>
            
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">Your Entry Codes:</p>
                <button
                  onClick={copyEntryCodes}
                  className={`text-sm ${copied ? 'text-green-600' : 'text-purple-600 hover:text-purple-700'} 
                    flex items-center space-x-1 transition-colors`}
                >
                  <Copy className="h-4 w-4" />
                  <span>{copied ? 'Copied!' : 'Copy All'}</span>
                </button>
              </div>
              <div className="space-y-2">
                {displayedCodes.map((code, index) => (
                  <div 
                    key={code}
                    className="bg-white rounded-lg border border-purple-100 p-2.5 text-center shadow-sm"
                  >
                    <code className="font-mono font-bold text-purple-600">
                      {code}
                    </code>
                  </div>
                ))}
                {order.entryCodes.length > 3 && (
                  <button
                    onClick={() => setShowAllCodes(!showAllCodes)}
                    className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center space-x-1"
                  >
                    <span>
                      {showAllCodes ? 'Show Less' : `Show All (${order.entryCodes.length})`}
                    </span>
                    {showAllCodes ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl 
                py-3 px-4 font-medium hover:from-purple-700 hover:to-indigo-700 
                transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02]"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}