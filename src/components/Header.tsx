import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Phone, ChevronRight, Menu, X, ShoppingCart, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cart, wishlist, cartAnimationTrigger } = useStore();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const getLinkClass = (path: string) => {
    const baseClass = "text-brand-dark px-3 py-2.5 rounded-md transition-colors";
    return location.pathname === path 
      ? `${baseClass} bg-brand-accent`
      : `${baseClass} hover:bg-brand-accent/50`;
  };

  const getMobileLinkClass = (path: string) => {
    return location.pathname === path ? "text-brand-light" : "";
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-4 right-4 z-50 bg-brand-light border border-brand-dark/20 rounded-2xl shadow-sm px-4 md:px-8 py-3 md:py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Link to="/" className="font-heading font-bold text-xl md:text-2xl tracking-tight text-brand-dark">
            Woodworking.Inc
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1 lg:gap-3 font-bold text-base">
          <Link to="/" className={getLinkClass('/')}>Home</Link>
          <Link to="/about" className={getLinkClass('/about')}>About</Link>
          <Link to="/portfolio" className={getLinkClass('/portfolio')}>Portfolio</Link>
          <Link to="/services" className={getLinkClass('/services')}>Services</Link>
          <Link to="/shop" className={getLinkClass('/shop')}>Shop</Link>
          <Link to="/contact" className={getLinkClass('/contact')}>Contact</Link>
        </nav>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-4 text-brand-dark mr-2">
            <Link to="/wishlist" className="hidden md:block hover:text-brand-gold transition-colors relative">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand-brown text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <a href="tel:+001234209304" className="md:hidden hover:text-brand-gold transition-colors">
              <Phone size={20} />
            </a>
            
            <Link to="/cart" className="hover:text-brand-gold transition-colors relative">
              <motion.div
                key={cartAnimationTrigger}
                initial={{ scale: 1 }}
                animate={cartAnimationTrigger > 0 ? { 
                  scale: [1, 1.2, 0.9, 1.1, 1],
                  rotate: [0, -10, 10, -5, 0]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <ShoppingCart size={20} />
              </motion.div>
              {cartItemsCount > 0 && (
                <motion.span 
                  key={`badge-${cartAnimationTrigger}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-2 bg-brand-gold text-brand-dark text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                >
                  {cartItemsCount}
                </motion.span>
              )}
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-5 text-brand-dark">
            <a href="#" className="hover:text-brand-dark transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-brand-dark transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-brand-dark transition-colors"><Phone size={20} /></a>
          </div>
          
          <div className="hidden md:flex items-center ml-2">
            <Link to="/quote" className="uppercase text-xs font-bold tracking-widest border border-brand-dark/20 px-6 py-3 btn-fill-dark transition-colors flex items-center gap-2 h-[46px] rounded-sm">
              Get a Quote <ChevronRight size={16} />
            </Link>
          </div>

          <button 
            className="md:hidden text-brand-dark p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-gold flex flex-col px-6 pt-28 pb-8 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-2xl font-heading font-bold text-brand-dark mt-8">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/')}>Home</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/about')}>About</Link>
              <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/portfolio')}>Portfolio</Link>
              <Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/services')}>Services</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/shop')}>Shop</Link>
              <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 ${getMobileLinkClass('/cart')}`}>
                Cart {cartItemsCount > 0 && <span className="bg-white text-brand-dark text-sm px-2 py-0.5 rounded-full">{cartItemsCount}</span>}
              </Link>
              <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 ${getMobileLinkClass('/wishlist')}`}>
                Wishlist {wishlist.length > 0 && <span className="bg-white text-brand-dark text-sm px-2 py-0.5 rounded-full">{wishlist.length}</span>}
              </Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/contact')}>Contact Us</Link>
              <Link to="/quote" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/quote')}>Get a Quote</Link>
            </nav>

            <div className="mt-auto flex items-center gap-8 text-brand-dark">
              <a href="#"><Facebook size={28} /></a>
              <a href="#"><Instagram size={28} /></a>
              <a href="#"><Phone size={28} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
