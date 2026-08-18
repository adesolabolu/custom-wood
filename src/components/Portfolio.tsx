import React, { useState, useRef, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useAdmin } from '../context/AdminContext';
import { galleryImages as defaultGalleryImages } from '../data/portfolio';

export function Portfolio() {
  const reveal = useScrollReveal();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { galleries } = useAdmin();
  
  // Use admin state galleries if available, fallback to default, then grab the first 5 items
  const displayImages = useMemo(() => {
    const source = galleries && galleries.length > 0 ? galleries : defaultGalleryImages;
    return source.slice(0, 5);
  }, [galleries]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <section className="w-full px-8 md:px-12 lg:px-16 py-16 md:py-32 max-w-[1600px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={() => setHoveredItem(null)}>
        
        <AnimatePresence>
          {hoveredItem && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, x: mousePos.x + 15, y: mousePos.y + 15 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.5 }}
              className="pointer-events-none absolute z-50 bg-brand-light text-brand-dark px-4 py-2 text-sm font-semibold tracking-wide shadow-lg"
              style={{ left: 0, top: 0 }}
            >
              {hoveredItem}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="lg:col-span-4 flex flex-col justify-center">
          <motion.div
            ref={reveal.ref}
            initial={reveal.initial}
            animate={reveal.animate}
            variants={reveal.variants}
          >
            <p className="uppercase tracking-widest text-sm font-bold flex items-center gap-1 before:content-['['] after:content-[']'] mb-8">
              Portfolio
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium mb-6 text-brand-dark tracking-wide">
              OUR WORK
            </h2>
            <p className="text-brand-dark/80 leading-relaxed mb-10 max-w-sm">
              Structural integrity meets architectural beauty in our custom outdoor woodworking projects. Our custom kitchens combine practical storage solutions with stunning visual appeal.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link to="/portfolio" className="flex items-center gap-2 hover:text-brand-brown transition-colors uppercase tracking-widest text-xs font-semibold">
                View all our work <ChevronRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6 relative">
            {displayImages.length >= 1 && (
              <div className="col-span-2 md:col-span-5 h-[300px] md:h-[600px] block">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  onMouseEnter={() => setHoveredItem(displayImages[0].title)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="w-full h-full rounded-2xl overflow-hidden"
                >
                  <img 
                    src={displayImages[0].src} 
                    alt={displayImages[0].title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  />
                </motion.div>
              </div>
            )}

            <div className="col-span-2 md:col-span-7 flex flex-col gap-4 md:gap-6 h-auto md:h-[600px]">
              <div className="grid grid-cols-2 gap-4 md:gap-6 h-[200px] md:h-auto flex-1">
                 {displayImages.length >= 2 && (
                   <div className="block h-full">
                     <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      onMouseEnter={() => setHoveredItem(displayImages[1].title)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="rounded-2xl overflow-hidden w-full h-full"
                     >
                       <img 
                        src={displayImages[1].src} 
                        alt={displayImages[1].title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                      />
                     </motion.div>
                   </div>
                 )}
                 {displayImages.length >= 3 && (
                   <div className="block h-full">
                     <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      onMouseEnter={() => setHoveredItem(displayImages[2].title)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="rounded-2xl overflow-hidden w-full h-full"
                     >
                       <img 
                        src={displayImages[2].src} 
                        alt={displayImages[2].title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                      />
                     </motion.div>
                   </div>
                 )}
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6 h-[200px] md:h-auto flex-1">
                {displayImages.length >= 4 && (
                  <div className="block h-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      onMouseEnter={() => setHoveredItem(displayImages[3].title)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="w-full h-full rounded-2xl overflow-hidden"
                    >
                      <img 
                        src={displayImages[3].src} 
                        alt={displayImages[3].title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                      />
                    </motion.div>
                  </div>
                )}
                {displayImages.length >= 5 && (
                  <div className="block h-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      onMouseEnter={() => setHoveredItem(displayImages[4].title)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="w-full h-full rounded-2xl overflow-hidden"
                    >
                      <img 
                        src={displayImages[4].src} 
                        alt={displayImages[4].title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                      />
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
