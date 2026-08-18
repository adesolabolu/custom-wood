import { Product } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'In Production' | 'Shipped' | 'Delivered';
  date: string;
  contactInfo?: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  trackingCode?: string;
  notes?: string;
  tenantId?: string;
}

export const orders: Order[] = [
  {
    id: "ORD-1001",
    contactInfo: {
      name: "John Doe",
      email: "john@example.com",
      phone: "555-0123",
    },
    shippingAddress: {
      street: "123 Woodcrafter Lane",
      city: "Portland",
      state: "OR",
      zip: "97204",
      country: "USA"
    },
    items: [],
    total: 165.00,
    status: 'Pending',
    date: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: "ORD-1002",
    contactInfo: {
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      phone: "555-9876",
    },
    shippingAddress: {
      street: "456 Oak Avenue",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "USA"
    },
    items: [],
    total: 840.50,
    status: 'Shipped',
    trackingCode: 'UPS1Z9999999999999999',
    date: new Date(Date.now() - 3 * 86400000).toISOString() // 3 days ago
  },
  {
    id: "ORD-1003",
    contactInfo: {
      name: "Michael Chen",
      email: "m.chen@example.com",
      phone: "555-4567",
    },
    shippingAddress: {
      street: "789 Pine Street",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "USA"
    },
    items: [],
    total: 320.00,
    status: 'In Production',
    date: new Date(Date.now() - 5 * 86400000).toISOString() // 5 days ago
  }
];
