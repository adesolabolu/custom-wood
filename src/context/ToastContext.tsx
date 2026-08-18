import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info';
  link?: { text: string; url: string };
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'info', link?: { text: string; url: string }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success', link?: { text: string; url: string }) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type, link }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[150] flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="bg-brand-dark text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-4 pointer-events-auto"
            >
              <div className={`p-2 rounded-full ${toast.type === 'success' ? 'bg-brand-gold/20 text-brand-gold' : 'bg-blue-500/20 text-blue-400'}`}>
                {toast.type === 'success' ? <Check size={20} /> : <Info size={20} />}
              </div>
              <p className="font-medium text-sm">{toast.message}</p>
              {toast.link && (
                <Link to={toast.link.url} className="ml-2 text-xs font-bold uppercase tracking-wider text-brand-gold hover:text-white transition-colors">
                  {toast.link.text}
                </Link>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
