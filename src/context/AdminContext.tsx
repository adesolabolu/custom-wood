import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, products as staticProducts } from '../data/products';
import { galleryImages as staticGalleries } from '../data/portfolio';
import { ContactMessage, contactMessages as staticContactMessages } from '../data/contactMessages';
import { Newsletter, newsletters as staticNewsletters } from '../data/newsletters';
import { QuoteRequest, quotes as staticQuotes } from '../data/quotes';
import { Order, orders as staticOrders } from '../data/orders';
import { CURRENT_TENANT_ID } from '../config/tenant';

export interface GalleryItem {
  id: string;
  category: string;
  title: string;
  src: string;
  tenantId?: string;
}

interface AdminContextType {
  products: Product[];
  galleries: GalleryItem[];
  newsletters: Newsletter[];
  contactMessages: ContactMessage[];
  quotes: QuoteRequest[];
  orders: Order[];
  
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  addNewsletter: (email: string) => void;
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'date'>) => void;
  addQuoteRequest: (quote: Omit<QuoteRequest, 'id' | 'date'>) => void;
  
  addOrder: (order: Order) => void;
  getOrder: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateOrderNote: (orderId: string, note: string) => void;
  deleteOrder: (orderId: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

function useLocalStorageState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      const parsed = JSON.parse(item);
      if (Array.isArray(parsed) && Array.isArray(initialValue)) {
        const existingIds = new Set(parsed.map((x: any) => x?.id).filter(Boolean));
        const missing = (initialValue as any[]).filter((x: any) => x?.id && !existingIds.has(x.id));
        if (missing.length > 0) {
          return [...parsed, ...missing] as unknown as T;
        }
      }
      return parsed;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useLocalStorageState<Product[]>('woodwork_products', staticProducts);
  const [galleries, setGalleries] = useLocalStorageState<GalleryItem[]>('woodwork_galleries', staticGalleries);
  const [newsletters, setNewsletters] = useLocalStorageState<Newsletter[]>('woodwork_newsletters', staticNewsletters);
  const [contactMessages, setContactMessages] = useLocalStorageState<ContactMessage[]>('woodwork_contactMessages', staticContactMessages);
  const [quotes, setQuotes] = useLocalStorageState<QuoteRequest[]>('woodwork_quotes', staticQuotes);
  const [orders, setOrders] = useLocalStorageState<Order[]>('woodwork_orders', staticOrders);

  const addProduct = async (product: Product) => setProducts(prev => [...prev, product]);
  const updateProduct = async (product: Product) => setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  const deleteProduct = async (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  const addGalleryItem = async (item: GalleryItem) => setGalleries(prev => [...prev, item]);
  const updateGalleryItem = async (item: GalleryItem) => setGalleries(prev => prev.map(g => g.id === item.id ? item : g));
  const deleteGalleryItem = async (id: string) => setGalleries(prev => prev.filter(g => g.id !== id));

  const addNewsletter = async (email: string) => {
    const newEntry = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      date: new Date().toISOString(),
      tenantId: CURRENT_TENANT_ID
    };
    setNewsletters(prev => [...prev, newEntry]);
  };

  const addContactMessage = async (msg: Omit<ContactMessage, 'id' | 'date'>) => {
    const newEntry = {
      ...msg,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      tenantId: CURRENT_TENANT_ID
    };
    setContactMessages(prev => [...prev, newEntry as ContactMessage]);
  };

  const addQuoteRequest = async (quote: Omit<QuoteRequest, 'id' | 'date'>) => {
    const newEntry = {
      ...quote,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      tenantId: CURRENT_TENANT_ID
    };
    setQuotes(prev => [...prev, newEntry as QuoteRequest]);
  };

  const addOrder = async (order: Order) => setOrders(prev => [...prev, { ...order }]);
  
  const getOrder = (orderId: string) => orders.find(o => o.id === orderId);
  
  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };
  
  const updateOrderNote = async (orderId: string, notes: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, notes } : o));
  };
  
  const deleteOrder = async (orderId: string) => setOrders(prev => prev.filter(o => o.id !== orderId));

  return (
    <AdminContext.Provider value={{
      products, galleries, newsletters, contactMessages, quotes, orders,
      addProduct, updateProduct, deleteProduct,
      addGalleryItem, updateGalleryItem, deleteGalleryItem,
      addNewsletter, addContactMessage, addQuoteRequest,
      addOrder, getOrder, updateOrderStatus, updateOrderNote, deleteOrder
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
