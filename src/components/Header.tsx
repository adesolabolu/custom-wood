import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Phone, ChevronRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
          <Link to="/" className={getLinkClass('/')} data-umami-event="custom-wood-multi-main - cta-click">Home</Link>
          <Link to="/about" className={getLinkClass('/about')} data-umami-event="custom-wood-multi-main - cta-click">About</Link>
          <Link to="/portfolio" className={getLinkClass('/portfolio')} data-umami-event="custom-wood-multi-main - cta-click">Portfolio</Link>
          <Link to="/services" className={getLinkClass('/services')} data-umami-event="custom-wood-multi-main - cta-click">Services</Link>
          <Link to="/contact" className={getLinkClass('/contact')} data-umami-event="custom-wood-multi-main - cta-click">Contact</Link>
        </nav>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-4 text-brand-dark mr-2">
            <a href="tel:+001234209304" className="md:hidden hover:text-brand-gold transition-colors" data-umami-event="custom-wood-multi-main - cta-click">
              <Phone size={20} />
            </a>
            <a href="#" className="md:hidden hover:text-brand-gold transition-colors">
              <Facebook size={20} />
            </a>
          </div>
          
          <div className="hidden lg:flex items-center gap-5 text-brand-dark">
            <a href="#" className="hover:text-brand-dark transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-brand-dark transition-colors"><Instagram size={20} /></a>
            <a href="tel:+001234209304" className="hover:text-brand-dark transition-colors" data-umami-event="custom-wood-multi-main - cta-click"><Phone size={20} /></a>
          </div>
          
          <div className="hidden md:flex items-center ml-2">
            <Link to="/quote" className="uppercase text-xs font-bold tracking-widest border border-brand-dark/20 px-6 py-3 btn-fill-dark transition-colors flex items-center gap-2 h-[46px] rounded-sm" data-umami-event="custom-wood-multi-main - cta-click">
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
