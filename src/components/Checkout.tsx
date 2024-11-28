import React, { useState } from 'react';
import { ShoppingBag, Gift, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { OrderSummary } from './checkout/OrderSummary';
import { PersonalInfo } from './checkout/PersonalInfo';
import { ShippingInfo } from './checkout/ShippingInfo';
import { PaymentSection } from './checkout/PaymentSection';
import { FormErrorSummary } from './checkout/FormErrorSummary';
import { validateForm } from './checkout/validation';
import { FormData, FormErrors } from './checkout/types';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/orderService';
import { SuccessModal } from './checkout/SuccessModal';
import { Order } from '../types/order';

export function Checkout() {
  const navigate = useNavigate();
  const { state: cart, dispatch: cartDispatch } = useCart();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    apartmentNo: '',
    city: '',
    country: 'Maldives',
    idNumber: 'A',
    paymentMethod: 'bank'
  });
  const [idPhoto, setIdPhoto] = useState<File | null>(null);
  const [transferSlip, setTransferSlip] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is modified
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'transfer') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          [type === 'id' ? 'idPhoto' : 'transferSlip']: 'Please upload a valid image file'
        }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          [type === 'id' ? 'idPhoto' : 'transferSlip']: 'Image size should be less than 5MB'
        }));
        return;
      }

      // Set file and clear error
      if (type === 'id') {
        setIdPhoto(file);
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.idPhoto;
          return newErrors;
        });
      } else {
        setTransferSlip(file);
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.transferSlip;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData, idPhoto, transferSlip);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to the first error
      const firstErrorElement = document.querySelector('.text-red-500');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    
    try {
      const order = await submitOrder(
        { ...formData, idPhoto, transferSlip },
        cart,
        'iphone-16-pro-max' // Current active promotion
      );
      
      setSubmittedOrder(order);
      cartDispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.error('Order submission failed:', error);
      setErrors({
        submit: 'Failed to submit order. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setSubmittedOrder(null);
    navigate('/');
  };

  if (cart.items.length === 0 && !submittedOrder) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart to continue checkout.</p>
          <Link
            to="/"
            className="inline-flex items-center text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shopping
              </Link>
              <div className="flex items-center space-x-3">
                <Gift className="h-8 w-8 text-purple-600" />
                <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
              <div className="p-6 sm:p-8">
                {Object.keys(errors).length > 0 && (
                  <FormErrorSummary errors={errors} />
                )}

                <OrderSummary />

                <form onSubmit={handleSubmit} className="mt-8 space-y-8">
                  <PersonalInfo
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                    onFileChange={handleFileChange}
                    idPhoto={idPhoto}
                  />

                  <ShippingInfo
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                  />

                  <PaymentSection
                    formData={formData}
                    errors={errors}
                    onChange={handleChange}
                    onFileChange={handleFileChange}
                    transferSlip={transferSlip}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-300 relative overflow-hidden ${
                      isSubmitting 
                        ? 'bg-purple-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:scale-[1.02]'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      'Complete Purchase'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {submittedOrder && (
        <SuccessModal
          order={submittedOrder}
          onClose={handleCloseSuccessModal}
        />
      )}
    </>
  );
}