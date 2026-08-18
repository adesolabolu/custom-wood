import { useStore } from '../context/StoreContext';
import { useAdmin } from '../context/AdminContext';
import { useToast } from '../context/ToastContext';
import { Product } from '../data/products';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const { products } = useAdmin();
  const { showToast } = useToast();
  
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast(`Added ${product.name} to cart`, 'success', { text: 'View Cart', url: '/cart' });
  };

  return (
    <div className="bg-brand-light min-h-screen pb-20 pt-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        <Breadcrumbs />

        <div className="text-center mb-16">
          <div className="uppercase tracking-widest text-xs font-bold mb-4 flex items-center justify-center gap-4 before:content-['['] after:content-[']'] text-brand-dark">
            Your Favorites
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-brand-dark uppercase">
            Wishlist
          </h1>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-brand-dark/5 max-w-4xl mx-auto">
            <Heart size={48} className="mx-auto text-brand-dark/20 mb-6" />
            <h2 className="text-2xl font-heading font-medium text-brand-dark mb-4">Your wishlist is empty</h2>
            <p className="text-brand-dark/60 mb-8 max-w-md mx-auto">
              Save items you love to your wishlist to easily find them later or share with friends.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-4 uppercase font-bold tracking-wider text-sm rounded-sm hover:bg-brand-gold hover:text-brand-dark transition-colors">
              Explore Shop <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistProducts.map((product) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-dark/5 flex flex-col group"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <button 
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-dark shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors z-10"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-heading font-medium text-brand-dark mb-1">{product.name}</h3>
                  <p className="text-brand-brown font-semibold mb-4">${product.price.toFixed(2)}</p>
                  
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="mt-auto w-full bg-brand-dark text-white py-3 font-bold uppercase tracking-wider text-xs rounded-sm hover:bg-brand-gold hover:text-brand-dark transition-colors flex justify-center items-center gap-2"
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
