import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Eye, X, Check } from 'lucide-react';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';
import { useAdmin } from '../context/AdminContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function Shop() {
  const { products } = useAdmin();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const { showToast } = useToast();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('popularity');
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('woodwork_recent');
    if (saved) {
      setRecentlyViewed(JSON.parse(saved));
    }
  }, []);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    addToRecent(product);
  };

  const addToRecent = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 4);
      localStorage.setItem('woodwork_recent', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    showToast(`Added ${product.name} to cart`, 'success', { text: 'View Cart', url: '/cart' });
  };

  const handleToggleWishlist = (product: Product) => {
    toggleWishlist(product.id);
    const isNowInWishlist = !isInWishlist(product.id);
    if (isNowInWishlist) {
      showToast(`Added ${product.name} to wishlist`, 'success', { text: 'View Wishlist', url: '/wishlist' });
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'price_low_high') return a.price - b.price;
    if (sortOrder === 'price_high_low') return b.price - a.price;
    return b.popularity - a.popularity;
  });

  return (
    <div className="bg-brand-light min-h-screen pb-20">
      
      {/* Header Section */}
      <section className="relative w-full pt-32 pb-10 flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="w-full text-left">
          <Breadcrumbs />
        </div>
        <div className="relative z-10 text-brand-dark px-6 w-full">
          <div className="uppercase tracking-widest text-xs font-bold mb-8 flex items-center justify-center gap-4 before:content-['['] after:content-[']']">
            SHOP
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight uppercase max-w-3xl mx-auto mb-6">
            Handcrafted Goods
          </h1>
          <p className="text-brand-dark/80 max-w-2xl mx-auto text-lg">
            Bring a piece of our workshop into your home with these meticulously crafted wooden accessories.
          </p>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 py-6 border-y border-brand-dark/10">
          <p className="text-brand-dark/60 font-medium mb-4 sm:mb-0">
            Showing {products.length} products
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-dark">Sort By:</span>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-transparent border border-brand-dark/20 text-brand-dark px-4 py-2 rounded-sm outline-none focus:border-brand-gold transition-colors cursor-pointer"
            >
              <option value="popularity">Popularity</option>
              <option value="price_low_high">Price: Low to High</option>
              <option value="price_high_low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {sortedProducts.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuickView(product)}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-dark shadow-lg hover:bg-brand-gold transition-colors"
                  >
                    <Eye size={20} />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToCart(product)}
                    className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center text-white shadow-lg hover:bg-brand-gold hover:text-brand-dark transition-colors"
                  >
                    <ShoppingCart size={20} />
                  </motion.button>
                </div>

                {/* Wishlist toggle */}
                <button 
                  onClick={() => handleToggleWishlist(product)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-dark shadow-sm hover:bg-white transition-colors z-10"
                >
                  <Heart size={18} className={isInWishlist(product.id) ? "fill-brand-brown text-brand-brown" : ""} />
                </button>
              </div>
              
              <div className="flex flex-col flex-grow text-center">
                <p className="text-xs uppercase tracking-widest font-bold text-brand-dark/50 mb-2">{product.category}</p>
                <h3 className="text-xl font-heading font-medium text-brand-dark mb-2">{product.name}</h3>
                <p className="text-brand-brown font-semibold text-lg">${product.price.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-dark/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-brand-light w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row relative"
            >
              <button 
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-[300px] md:h-auto">
                <img 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-widest font-bold text-brand-dark/50 mb-4">{quickViewProduct.category}</p>
                <h3 className="text-3xl lg:text-4xl font-heading font-medium text-brand-dark mb-4">{quickViewProduct.name}</h3>
                <p className="text-2xl text-brand-brown font-semibold mb-6">${quickViewProduct.price.toFixed(2)}</p>
                <p className="text-brand-dark/80 leading-relaxed mb-8">{quickViewProduct.description}</p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 bg-brand-dark text-brand-light py-4 font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-brand-gold hover:text-brand-dark transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => handleToggleWishlist(quickViewProduct)}
                    className="w-14 h-14 border border-brand-dark/20 rounded-sm flex items-center justify-center hover:bg-brand-dark/5 transition-colors"
                  >
                    <Heart size={20} className={isInWishlist(quickViewProduct.id) ? "fill-brand-brown text-brand-brown" : "text-brand-dark"} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recently Viewed Section */}
      {recentlyViewed.length > 0 && (
        <section className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 mt-32">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-medium text-brand-dark uppercase">
              Recently Viewed
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentlyViewed.map((product) => (
              <motion.div 
                key={`recent-${product.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuickView(product)}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-dark shadow-lg hover:bg-brand-gold transition-colors"
                    >
                      <Eye size={16} />
                    </motion.button>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-heading font-medium text-brand-dark mb-1">{product.name}</h3>
                  <p className="text-brand-brown font-semibold text-sm">${product.price.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
