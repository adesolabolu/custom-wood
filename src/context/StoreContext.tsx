import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';
import { CURRENT_TENANT_ID } from '../config/tenant';

interface CartItem {
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
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addOrder: (order: Order) => void;
  getOrder: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateOrderNote: (orderId: string, note: string) => void;
  deleteOrder: (orderId: string) => void;
  cartAnimationTrigger: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('woodwork_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('woodwork_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>([]);

  const [cartAnimationTrigger, setCartAnimationTrigger] = useState(0);

  useEffect(() => {
    localStorage.setItem('woodwork_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('woodwork_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const saved = localStorage.getItem('woodwork_orders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('woodwork_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartAnimationTrigger(prev => prev + 1);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

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
    <StoreContext.Provider value={{
      cart, wishlist, orders, addToCart, removeFromCart, updateQuantity, clearCart, 
      toggleWishlist, isInWishlist, addOrder, getOrder, updateOrderStatus, updateOrderNote, deleteOrder, cartAnimationTrigger
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
