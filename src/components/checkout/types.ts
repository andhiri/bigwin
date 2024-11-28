export type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  apartmentNo: string;
  city: string;
  country: string;
  idNumber: string;
  paymentMethod: string;
};

export type FormErrors = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  idNumber?: string;
  idPhoto?: string;
  transferSlip?: string;
};