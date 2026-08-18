import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';

const values = [
  {
    title: 'Sustainable Practices',
    description: 'Moisture-resistant, masterfully crafted woodwork that adds warmth to your private sanctuary. Discover the beauty of custom-crafted wood, designed specifically to complement your unique space. We design and build kitchen spaces that serve as the warm, inviting heart of your home.',
    icon: 'https://cdn.prod.website-files.com/6687bb58d107108aa401e5aa/668d4d370e1be593aa9351fd_abstract%20(3)%20(2).svg'
  },
  {
    title: 'Modern Techniques',
    description: 'Bespoke bathroom cabinetry designed for optimal organization and spa-like luxury. From elegant cabinetry to structural enhancements, we bring an artisan\'s touch to modern living. Each piece of custom furniture is thoughtfully designed to become a cherished family heirloom.',
    icon: 'https://cdn.prod.website-files.com/6687bb58d107108aa401e5aa/668d4d37c9d000d6d3e5e442_abstract%20(4)%20(1).svg'
  },
  {
    title: 'Entirely Bespoke',
    description: 'Enhance your property\'s exterior with robust and beautiful custom timber structures. Sustainable sourcing meets masterful execution in every project we take on. Experience the comfort and elegance of bespoke seating, tables, and bedroom suites.',
    icon: 'https://cdn.prod.website-files.com/6687bb58d107108aa401e5aa/668d4d37c6353227e6fc0f4a_abstract%20(2)%20(1).svg'
  },
  {
    title: 'Future Proof',
    description: 'From grand entryways to stunning pergolas, we extend our craftsmanship to the great outdoors. We transform raw timber into refined architectural elements that stand the test of time. Our artisanal approach ensures your furniture perfectly matches your lifestyle and taste.',
    icon: 'https://cdn.prod.website-files.com/6687bb58d107108aa401e5aa/668d4d372589b149e514bf0d_abstract%20(1)%20(1).svg'
  }
];

export function Values() {
  const reveal = useScrollReveal();
  const reveal2 = useScrollReveal(0.2);

  return (
    <section className="w-full px-8 md:px-12 lg:px-16 py-16 md:py-32 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-3">
          <p className="uppercase tracking-widest text-sm font-bold flex items-center gap-1 before:content-['['] after:content-[']']">
            Our Values
          </p>
        </div>
        
        <div className="lg:col-span-6">
          <motion.h2 
            ref={reveal.ref}
            initial={reveal.initial}
            animate={reveal.animate}
            variants={reveal.variants}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium leading-tight text-brand-dark"
          >
            NO COMPROMISES, QUALITY MATERIALS, <span className="text-brand-brown">MADE TO LAST</span>
          </motion.h2>
        </div>

        <div className="lg:col-span-3 flex justify-start lg:justify-end items-end mt-4 lg:mt-0">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center">
            <Link to="/about" className="uppercase text-xs font-semibold tracking-wider border border-brand-dark/20 px-6 py-3 btn-fill-dark transition-colors flex items-center gap-2 h-[46px] rounded-sm">
              Learn more about us <ChevronRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        <div className="lg:col-span-4 h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
          <motion.img 
            ref={reveal2.ref}
            initial={reveal2.initial}
            animate={reveal2.animate}
            variants={reveal2.variants}
            src="https://res.cloudinary.com/drzh5dzha/image/upload/v1782491421/woodwork_template/668d3884f36b69312970d5df_pexels-heyho-7031723.webp" 
            alt="Craftsmanship values" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {values.map((value, index) => (
            <motion.div 
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-14 h-14 bg-brand-accent rounded-md flex items-center justify-center mb-6">
                <img src={value.icon} alt={value.title} className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-heading font-medium mb-4 text-brand-dark">{value.title}</h3>
              <p className="text-brand-dark/80 leading-relaxed text-base md:text-lg">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
