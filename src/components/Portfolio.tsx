import React, { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function Portfolio() {
  const reveal = useScrollReveal();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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
            <Link to="/portfolio/light-pine-kitchen" className="col-span-2 md:col-span-5 h-[300px] md:h-[600px] block">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onMouseEnter={() => setHoveredItem('Light Pine Kitchen')}
                onMouseLeave={() => setHoveredItem(null)}
                className="w-full h-full rounded-2xl overflow-hidden cursor-pointer"
              >
                <img 
                  src="https://res.cloudinary.com/drzh5dzha/image/upload/v1782491619/woodwork_template/669a78fadc1f1a2934f63720_pexels-heyho-6933857%20%281%29.webp" 
                  alt="Light Pine Kitchen" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                />
              </motion.div>
            </Link>

            <div className="col-span-2 md:col-span-7 flex flex-col gap-4 md:gap-6 h-auto md:h-[600px]">
              <div className="grid grid-cols-2 gap-4 md:gap-6 h-[200px] md:h-auto flex-1">
                 <Link to="/portfolio/airy-apartment" className="block h-full">
                   <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    onMouseEnter={() => setHoveredItem('Airy Apartment')}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="rounded-2xl overflow-hidden w-full h-full cursor-pointer"
                   >
                     <img 
                      src="https://res.cloudinary.com/drzh5dzha/image/upload/v1782491644/woodwork_template/669a79d0f958996e16feb55d_pexels-heyho-7045991%20%281%29.webp" 
                      alt="Airy Apartment" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                   </motion.div>
                 </Link>
                 <Link to="/portfolio/hamptons-manor-house" className="block h-full">
                   <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    onMouseEnter={() => setHoveredItem('Hamptons Manor House')}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="rounded-2xl overflow-hidden w-full h-full cursor-pointer"
                   >
                     <img 
                      src="https://res.cloudinary.com/drzh5dzha/image/upload/v1782491674/woodwork_template/669a7a6536701b5353ed9a15_pexels-heyho-8134762%20%281%29.webp" 
                      alt="Hamptons Manor House" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                   </motion.div>
                 </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6 h-[200px] md:h-auto flex-1">
                <Link to="/portfolio/modern-kitchen" className="block h-full">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    onMouseEnter={() => setHoveredItem('Modern Kitchen')}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="w-full h-full rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <img 
                      src="https://res.cloudinary.com/drzh5dzha/image/upload/v1782491584/woodwork_template/669a74c06c11cb7e8dc5ef67_pexels-heyho-7061399.webp" 
                      alt="Modern Kitchen" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </motion.div>
                </Link>
                <Link to="/portfolio/live-edge-dining-table" className="block h-full">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    onMouseEnter={() => setHoveredItem('Live Edge Dining Table')}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="w-full h-full rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80" 
                      alt="Live Edge Dining Table" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
