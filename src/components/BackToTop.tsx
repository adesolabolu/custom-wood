import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUp, Phone } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-24 right-4 md:bottom-20 md:right-8 z-[120] flex flex-col items-center gap-3">
          {/* Back to Top Button on top */}
          <motion.button
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-brand-dark text-brand-gold rounded-full flex items-center justify-center shadow-lg hover:bg-brand-gold hover:text-brand-dark transition-colors"
            aria-label="Back to Top"
            title="Back to Top"
          >
            <ArrowUp size={24} />
          </motion.button>

          {/* Floating Call Button on bottom */}
          <motion.a
            href="tel:+001234209304"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center shadow-lg hover:bg-brand-dark hover:text-brand-gold transition-colors"
            aria-label="Call us"
            title="Call us"
          >
            <Phone size={22} className="fill-current" />
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
}
