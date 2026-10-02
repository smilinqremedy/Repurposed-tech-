import { CartItem } from "./cart";

export type OrderCustomer = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  notes?: string;
};

export type ShippingOption = {
  id: string;
  name: string;
  cost: number;
  deliveryEstimate: string;
  description: string;
};

export type Order = {
  id: string;
  orderNumber: string; // e.g. "RT-001" or "RT-4820"
  createdAt: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  shippingMethod: string;
  shippingCost: number;
  total: number;
  status: "confirmed" | "preparing" | "shipped" | "delivered";
  paymentMethod: "paystack" | "bank_transfer" | "card";
  paymentStatus: "paid" | "processing" | "pending";
  trackingNumber?: string;
  estimatedDelivery?: string;
};
