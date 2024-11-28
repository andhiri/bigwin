import { v4 as uuidv4 } from 'uuid';
import { storeAttachment } from './attachmentService';
import { Order } from '../types/order';
import { generateEntryCode } from '../utils/generateEntryCode';

function getEntryCount(packagePrice: number): number {
  switch (packagePrice) {
    case 50: return 2;
    case 120: return 5;
    case 250: return 7;
    default: return 0;
  }
}

export async function submitOrder(formData: any, cart: any, promotionId: string): Promise<Order> {
  // Store attachments
  const idPhotoFilename = await storeAttachment(formData.idPhoto);
  const transferSlipFilename = formData.paymentMethod === 'bank' && formData.transferSlip 
    ? await storeAttachment(formData.transferSlip)
    : undefined;

  // Calculate total entry codes based on cart items
  const entryCodes: string[] = [];
  cart.items.forEach(item => {
    const entryCount = getEntryCount(item.price);
    for (let i = 0; i < entryCount * item.quantity; i++) {
      entryCodes.push(generateEntryCode(promotionId));
    }
  });

  // Create the order object
  const order: Order = {
    id: uuidv4(),
    promotionId,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    idNumber: formData.idNumber,
    address: formData.address,
    apartmentNo: formData.apartmentNo,
    city: formData.city,
    country: formData.country,
    paymentMethod: formData.paymentMethod,
    total: cart.total,
    entryCodes,
    idPhotoFilename,
    transferSlipFilename,
    approved: false,
    rejected: false,
    createdAt: new Date().toISOString()
  };

  // Store the order in localStorage
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return order;
}