import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';

export function CTA() {
  const reveal = useScrollReveal();

  return (
    <section className="w-full px-8 md:px-12 lg:px-16 py-12 max-w-[1600px] mx-auto">
      <motion.div 
        ref={reveal.ref}
        initial={reveal.initial}
        animate={reveal.animate}
        variants={reveal.variants}
        className="relative w-full min-h-[400px] rounded-2xl overflow-hidden flex items-center justify-between p-10 md:p-20"
      >
        <div className="absolute inset-0 bg-brand-dark/40 z-10" />
        <img 
          src="https://res.cloudinary.com/drzh5dzha/image/upload/v1782491729/woodwork_template/669e2bfdc58ba40ac89d5524_pexels-heyho-8143944%20%281%29.webp" 
          alt="Parallax background" 
          className="parallax-bg absolute inset-0 w-full h-[130%] -top-[15%] object-cover -z-0"
        />

        <div className="relative z-20 flex flex-col lg:flex-row items-start lg:items-end justify-between w-full h-full">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {['Kitchens', 'Bathrooms', 'Cabinetry', 'Tables', 'Seating', 'Closets', 'Doors', 'Millwork', 'CNC', 'Commercial'].map((tag) => (
                <Link to={`/services/${tag.toLowerCase()}`} key={tag} className="border border-white/40 text-white px-4 py-1.5 rounded-sm text-xs tracking-wider uppercase font-medium backdrop-blur-sm text-center hover:bg-white/10 transition-colors">
                  {tag}
                </Link>
              ))}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium text-white max-w-3xl mt-4 leading-[1.1] uppercase tracking-wide">
              Enquire now for a free quote
            </h2>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center mt-12 lg:mt-0 shrink-0">
            <Link to="/quote" className="uppercase text-xs font-semibold tracking-wider border border-white/40 text-white px-6 py-4 btn-fill-white transition-colors flex items-center gap-2 h-[50px] backdrop-blur-sm rounded-sm">
              Enquire now <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
