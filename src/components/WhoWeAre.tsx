import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';

export function WhoWeAre() {
  const reveal = useScrollReveal();

  return (
    <section className="w-full px-8 md:px-12 lg:px-16 py-16 md:py-32 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        <div className="lg:col-span-3">
          <p className="uppercase tracking-widest text-sm font-bold flex items-center gap-1 before:content-['['] after:content-[']']">
            Who We Are
          </p>
        </div>
        
        <div className="lg:col-span-8">
          <motion.div
            ref={reveal.ref}
            initial={reveal.initial}
            animate={reveal.animate}
            variants={reveal.variants}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium mb-8 leading-tight tracking-wide">
              <span className="text-brand-dark">HAND CRAFTING</span><br />
              <span className="text-brand-brown">PERFECTION</span> <span className="text-brand-dark">SINCE 1967</span>
            </h2>
            <p className="text-2xl md:text-3xl font-heading mb-16 max-w-2xl leading-snug text-brand-dark font-medium">
              At Woodworking.Inc, we understand that the smallest details matter the most.
            </p>
            
            <div className="h-px w-full bg-brand-dark/10 mb-12"></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <p className="max-w-md text-brand-dark/80 leading-relaxed">
                Transform your bathroom into a tranquil retreat with custom wood vanities and elegant shelving. Every cut, joint, and finish is executed with uncompromising precision, ensuring lasting quality. Experience culinary inspiration surrounded by handcrafted cabinetry and flawless countertops.
              </p>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center shrink-0">
                <Link to="/about" className="uppercase text-xs font-semibold tracking-wider border border-brand-dark/20 px-6 py-4 btn-fill-dark transition-colors flex items-center gap-2 h-[50px] rounded-sm">
                  Learn about us <ChevronRight size={16} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
