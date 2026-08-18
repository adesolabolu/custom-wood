import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function Cart() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15 : 0; // Flat rate shipping, free over X? Let's say flat rate $15
  const total = subtotal + shipping;

  return (
    <div className="bg-brand-light min-h-screen pb-20 pt-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-12">
        <Breadcrumbs />
        <h1 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-brand-dark mb-12 uppercase">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-brand-dark/5">
            <h2 className="text-2xl font-heading font-medium text-brand-dark mb-4">Your cart is empty</h2>
            <p className="text-brand-dark/60 mb-8">Looks like you haven't added any handcrafted items yet.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-4 uppercase font-bold tracking-wider text-sm rounded-sm hover:bg-brand-gold hover:text-brand-dark transition-colors">
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Cart Items */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {cart.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={item.product.id}
                  className="bg-white p-4 md:p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-brand-dark/5"
                >
                  <Link to={`/shop`} className="w-full sm:w-32 h-32 shrink-0 rounded-lg overflow-hidden">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </Link>
                  
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-heading font-medium text-brand-dark">{item.product.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-brand-dark/40 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <p className="text-brand-dark/60 text-sm mb-4 line-clamp-1">{item.product.description}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-brand-dark/20 rounded-sm">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-brand-dark/5 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-brand-dark/5 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <p className="text-xl font-semibold text-brand-brown">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-dark/5 sticky top-32">
                <h3 className="text-2xl font-heading font-medium text-brand-dark mb-6">Order Summary</h3>
                
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex justify-between text-brand-dark/80">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-brand-dark/80">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-brand-dark/10 pt-4 flex justify-between items-end">
                    <span className="text-lg font-medium text-brand-dark">Total</span>
                    <span className="text-3xl font-heading font-semibold text-brand-brown">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-brand-gold text-brand-dark py-4 font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-brand-dark hover:text-white transition-colors"
                >
                  Proceed to Checkout
                </button>
                
                <p className="text-center text-xs text-brand-dark/50 mt-4 flex justify-center items-center gap-1">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
