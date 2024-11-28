import { FormData } from './types';

export function validateForm(formData: FormData, idPhoto: File | null, transferSlip: File | null) {
  const errors: Record<string, string> = {};

  // Required fields validation
  const requiredFields = {
    email: 'Email',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone Number',
    address: 'Address',
    city: 'City',
    idNumber: 'ID Number'
  };

  // Check required fields
  Object.entries(requiredFields).forEach(([field, label]) => {
    if (!formData[field as keyof FormData]?.trim()) {
      errors[field] = `${label} is required`;
    }
  });

  // Email validation
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation
  if (formData.phone && !/^[0-9]{7}$/.test(formData.phone)) {
    errors.phone = 'Please enter a valid 7-digit phone number';
  }

  // ID validation
  if (formData.idNumber && !/^A[0-9]{6}$/.test(formData.idNumber)) {
    errors.idNumber = 'Please enter a valid ID number (format: A123456)';
  }

  // ID Photo validation - ALWAYS required
  if (!idPhoto) {
    errors.idPhoto = 'Please upload your ID photo';
  } else if (!idPhoto.type.startsWith('image/')) {
    errors.idPhoto = 'Please upload a valid image file';
  } else if (idPhoto.size > 5 * 1024 * 1024) { // 5MB limit
    errors.idPhoto = 'Image size should be less than 5MB';
  }

  // Transfer slip validation - only required for bank transfer
  if (formData.paymentMethod === 'bank') {
    if (!transferSlip) {
      errors.transferSlip = 'Please upload your bank transfer slip';
    } else if (!transferSlip.type.startsWith('image/')) {
      errors.transferSlip = 'Please upload a valid image file';
    } else if (transferSlip.size > 5 * 1024 * 1024) { // 5MB limit
      errors.transferSlip = 'Image size should be less than 5MB';
    }
  }

  return errors;
}