import React, { useState, useEffect, useCallback } from 'react';
import { X, MapPin, Phone, Mail, CreditCard, FileText, Gift, Eye } from 'lucide-react';
import { Order } from '../../types/order';
import { usePromotions } from '../../hooks/usePromotions';
import { AttachmentViewer } from './AttachmentViewer';

type Props = {
  order: Order;
  onClose: () => void;
};

export function OrderDetails({ order, onClose }: Props) {
  const { promotions } = usePromotions();
  const promotion = promotions.find(p => p.id === order?.promotionId);
  const [viewingAttachment, setViewingAttachment] = useState<{
    filename: string;
    title: string;
  } | null>(null);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    const modal = document.getElementById('order-details-modal');
    const modalContent = document.getElementById('order-details-content');
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

  if (!order) {
    return null;
  }

  return (
    <div 
      id="order-details-modal" 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div 
        id="order-details-content" 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 transition-colors rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-purple-600">
              <Gift className="h-5 w-5" />
              <span className="font-medium">{promotion?.title || 'Unknown Promotion'}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Entry Codes</p>
                <div className="mt-1 space-y-1">
                  {order.entryCodes?.map((code) => (
                    <p key={code} className="font-mono text-sm">
                      {code}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">{order.total} MVR</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{order.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">+960 {order.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Address</h3>
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">{order.address}</p>
                {order.apartmentNo && <p className="text-gray-500">Apt {order.apartmentNo}</p>}
                <p className="text-gray-500">{order.city}, {order.country}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Payment Details</h3>
            <div className="flex items-start space-x-2">
              <CreditCard className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">
                  {order.paymentMethod === 'bank' ? 'Bank Transfer' : 'BML Payment Gateway'}
                </p>
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.idPhotoFilename && (
                <button
                  onClick={() => setViewingAttachment({
                    filename: order.idPhotoFilename,
                    title: 'ID Photo'
                  })}
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">View ID Photo</span>
                </button>
              )}

              {order.paymentMethod === 'bank' && order.transferSlipFilename && (
                <button
                  onClick={() => setViewingAttachment({
                    filename: order.transferSlipFilename!,
                    title: 'Payment Proof'
                  })}
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">View Transfer Slip</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {viewingAttachment && (
        <AttachmentViewer
          filename={viewingAttachment.filename}
          title={viewingAttachment.title}
          onClose={() => setViewingAttachment(null)}
        />
      )}
    </div>
  );
}