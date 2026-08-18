import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { servicesList } from '../data/services';

export function Services() {
  const reveal = useScrollReveal();
  const displayServices = servicesList.slice(0, 5);

  return (
    <section className="w-full px-8 md:px-12 lg:px-16 py-16 md:py-32 max-w-[1600px] mx-auto">
      <motion.div 
        ref={reveal.ref}
        initial={reveal.initial}
        animate={reveal.animate}
        variants={reveal.variants}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 lg:mb-16"
      >
        <p className="uppercase tracking-widest text-sm font-bold flex items-center gap-1 before:content-['['] after:content-[']']">
          Our Services
        </p>
        <Link to="/services" className="flex items-center gap-2 hover:text-brand-brown transition-colors uppercase tracking-widest text-xs font-semibold">
          View all our services <ChevronRight size={16} />
        </Link>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-4 h-[1000px] lg:h-[600px] w-full">
        {displayServices.map((service, index) => (
          <Link
            to={`/services/${service.slug}`}
            key={service.name}
            className="group relative rounded-2xl overflow-hidden block flex-1 hover:flex-[2.5] lg:hover:flex-[2] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/40 transition-colors duration-500 z-10" />
              <img 
                src={service.image} 
                alt={service.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute top-6 right-6 z-20">
                <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-white group-hover:text-brand-dark transition-colors duration-300">
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </div>
              </div>

              <div className="absolute bottom-8 left-6 z-20">
                <h3 className="text-white text-2xl font-heading font-medium tracking-wide whitespace-nowrap">
                  {service.name}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
