import { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useAdmin } from '../context/AdminContext';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function OrderStatus() {
  const { getOrder, orders } = useAdmin();
  const [searchParams, setSearchParams] = useSearchParams();
  const idFromQuery = searchParams.get('id') || '';
  
  const [searchId, setSearchId] = useState(idFromQuery);
  const [trackedId, setTrackedId] = useState(idFromQuery);
  const [error, setError] = useState('');

  const order = trackedId ? getOrder(trackedId) : null;

  useEffect(() => {
    if (idFromQuery) {
      setTrackedId(idFromQuery);
      setSearchId(idFromQuery);
    }
  }, [idFromQuery]);

  useEffect(() => {
    if (trackedId) {
      const foundOrder = getOrder(trackedId);
      if (!foundOrder && orders.length > 0) {
        setError('Order not found. Please check the ID and try again.');
      } else if (foundOrder) {
        setError('');
      }
    }
  }, [trackedId, orders, getOrder]);

  const handleSearch = (id: string = searchId) => {
    if (!id.trim()) return;
    setTrackedId(id);
    setSearchParams({ id });
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Processing': return 1;
      case 'In Production': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  const currentStep = order ? getStatusStep(order.status) : 0;

  const steps = [
    { title: 'Order Placed', icon: Clock },
    { title: 'Processing', icon: CheckCircle },
    { title: 'In Production', icon: Package },
    { title: 'Shipped', icon: Truck },
    { title: 'Delivered', icon: CheckCircle }
  ];

  return (
    <div className="bg-brand-light min-h-screen pb-20 pt-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <Breadcrumbs />
        <div className="text-center mb-12">
          <div className="uppercase tracking-widest text-xs font-bold mb-4 flex items-center justify-center gap-4 before:content-['['] after:content-[']'] text-brand-dark">
            Track Order
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-brand-dark uppercase">
            Order Status
          </h1>
        </div>

        <div className="bg-white p-2 rounded-lg shadow-sm border border-brand-dark/10 flex items-center mb-12 max-w-2xl mx-auto">
          <input 
            type="text" 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Order ID (e.g. ORD-123456)"
            className="flex-grow px-4 py-3 outline-none text-brand-dark placeholder:text-brand-dark/40"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={() => handleSearch()}
            className="bg-brand-dark text-white px-6 py-3 rounded-md uppercase text-xs font-bold tracking-wider hover:bg-brand-gold hover:text-brand-dark transition-colors flex items-center gap-2"
          >
            <Search size={16} /> Track
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md text-center max-w-2xl mx-auto mb-12">
            {error}
          </div>
        )}

        {order && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-lg border border-brand-dark/5 p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-brand-dark/10 pb-8 gap-4">
              <div>
                <p className="text-sm uppercase tracking-widest font-bold text-brand-dark/50 mb-1">Order Number</p>
                <h2 className="text-3xl font-heading font-medium text-brand-dark">{order.id.split('_')[0]}</h2>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm uppercase tracking-widest font-bold text-brand-dark/50 mb-1">Order Date</p>
                <p className="text-lg font-medium text-brand-dark">{new Date(order.date).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="relative mb-16 pt-8">
              <div className="absolute top-12 left-8 right-8 h-1 bg-gray-100 -z-10"></div>
              <div 
                className="absolute top-12 left-8 h-1 bg-brand-gold -z-10 transition-all duration-1000"
                style={{ width: `calc(${(currentStep / (steps.length - 1)) * 100}% - 2rem)` }}
              ></div>
              
              <div className="flex justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index <= currentStep;
                  const isCurrent = index === currentStep;
                  
                  return (
                    <div key={step.title} className="flex flex-col items-center gap-4 relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${isActive ? 'bg-brand-gold text-brand-dark' : 'bg-gray-100 text-gray-400'}`}>
                        <Icon size={20} />
                      </div>
                      <p className={`text-xs md:text-sm font-semibold uppercase tracking-wider text-center max-w-[80px] ${isCurrent ? 'text-brand-dark' : 'text-brand-dark/40'}`}>
                        {step.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h3 className="text-xl font-heading font-medium text-brand-dark mb-6">Order Details</h3>
              <div className="flex flex-col gap-4">
                {order.items.map((item: any) => (
                  <div key={item.product.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
                    <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-heading font-medium text-brand-dark">{item.product.name}</h4>
                      <p className="text-sm text-brand-dark/60">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-semibold text-brand-brown">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center border-t border-brand-dark/10 pt-6">
              <span className="text-lg font-medium text-brand-dark">Total Amount</span>
              <span className="text-3xl font-heading font-semibold text-brand-brown">${order.total.toFixed(2)}</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
