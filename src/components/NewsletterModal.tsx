import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useToast } from '../context/ToastContext';

export function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const { addNewsletter } = useAdmin();
  const { showToast } = useToast();

  useEffect(() => {
    const hasDismissed = localStorage.getItem('woodwork_hide_newsletter');
    if (!hasDismissed) {
      let timeout: ReturnType<typeof setTimeout>;
      const handleActivity = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setIsOpen(true);
        }, 10000); // 10 seconds of inactivity
      };

      // Set initial timeout
      timeout = setTimeout(() => {
        setIsOpen(true);
      }, 10000);

      window.addEventListener('mousemove', handleActivity);
      window.addEventListener('keypress', handleActivity);
      window.addEventListener('scroll', handleActivity);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener('mousemove', handleActivity);
        window.removeEventListener('keypress', handleActivity);
        window.removeEventListener('scroll', handleActivity);
      };
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('woodwork_hide_newsletter', 'true');
    }
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      addNewsletter(email);
      showToast('Successfully subscribed to the newsletter!', 'success');
      localStorage.setItem('woodwork_hide_newsletter', 'true');
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-brand-light max-w-md w-full relative p-8 shadow-2xl rounded-sm overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-brand-dark/50 hover:text-brand-dark transition-colors"
            >
              <X size={24} />
            </button>
            <div className="text-center mb-6">
              <h3 className="font-heading text-3xl text-brand-dark mb-2">Join the Workshop</h3>
              <p className="text-brand-dark/70 text-sm">
                Subscribe to get early access to new collections, exclusive woodcraft insights, and behind-the-scenes content.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white border border-brand-dark/20 text-brand-dark px-4 py-3 rounded-sm outline-none focus:border-brand-gold transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-brand-dark text-brand-light py-3 font-bold uppercase tracking-wider text-sm hover:bg-brand-gold hover:text-brand-dark transition-colors rounded-sm"
              >
                Subscribe Now
              </button>
              <label className="flex items-center gap-2 justify-center mt-4 text-xs text-brand-dark/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="rounded-sm border-brand-dark/30 text-brand-gold focus:ring-brand-gold"
                />
                Don't show this again
              </label>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
