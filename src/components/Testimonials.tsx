import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';

export function Testimonials() {
  const reveal = useScrollReveal();

  return (
    <section className="w-full py-20 md:py-32 bg-brand-light">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 lg:px-16 flex flex-col items-center text-center">
        <p className="uppercase tracking-widest text-sm font-bold flex items-center gap-1 before:content-['['] after:content-[']'] mb-16">
          Testimonials
        </p>

        <motion.div 
          ref={reveal.ref}
          initial={reveal.initial}
          animate={reveal.animate}
          variants={reveal.variants}
          className="max-w-4xl mx-auto relative w-full flex items-center justify-between"
        >
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:flex w-12 h-12 bg-brand-brown text-white items-center justify-center btn-fill-dark transition-colors rounded-sm shrink-0">
            <ChevronLeft size={24} />
          </motion.button>

          <div className="px-4 md:px-12 flex-grow">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading leading-tight mb-10 text-brand-dark font-medium">
              "Woodworking.Inc absolutely smashed it out of the park. The work was both timely and faultless, I have zero complaints."
            </h3>
            
            <div className="flex flex-col items-center">
              <p className="font-semibold text-sm tracking-widest uppercase mb-1">Mark Evans</p>
              <p className="text-brand-dark/80 text-sm">Kitchen Project</p>
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:flex w-12 h-12 bg-brand-brown text-white items-center justify-center hover:bg-brand-dark transition-colors rounded-sm shrink-0">
            <ChevronRight size={24} />
          </motion.button>
        </motion.div>

        {/* Mobile buttons */}
        <div className="flex md:hidden gap-4 mt-8">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-12 h-12 bg-brand-brown text-white flex items-center justify-center hover:bg-brand-dark transition-colors rounded-sm shrink-0">
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-12 h-12 bg-brand-brown text-white flex items-center justify-center hover:bg-brand-dark transition-colors rounded-sm shrink-0">
            <ChevronRight size={24} />
          </motion.button>
        </div>



        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center">
            <Link to="/quote" className="uppercase text-xs font-semibold tracking-wider border border-brand-dark/20 px-6 py-4 btn-fill-dark transition-colors flex items-center gap-2 h-[50px] rounded-sm">
              Get a quote now <ChevronRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
