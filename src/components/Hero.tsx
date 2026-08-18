import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';

export function Hero() {
  const reveal = useScrollReveal(0.2);

  return (
    <section className="w-full min-h-screen lg:h-screen relative flex flex-col lg:flex-row bg-brand-light overflow-hidden">
      
      {/* Left Column: Absolute background on mobile, standard column on desktop */}
      <div className="absolute inset-0 lg:static w-full lg:w-[50%] h-full z-0 flex items-center justify-end lg:bg-brand-light overflow-hidden">
        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://res.cloudinary.com/drzh5dzha/image/upload/v1782582323/577439c2-e0fa-4b46-9e33-0f0d0e28eaaf.png" 
          alt="Craftsman working with wood" 
          className="w-full h-full object-cover"
        />
        {/* Mobile Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:hidden" />
      </div>
      
      {/* Right Column: Content Area */}
      <div className="relative z-10 w-full lg:w-[50%] lg:bg-brand-dark text-brand-light p-6 sm:p-10 md:p-16 lg:p-24 xl:p-32 flex flex-col justify-end lg:justify-center min-h-screen lg:min-h-[50vh] lg:h-full pb-12 lg:pb-0">
        <motion.div
          ref={reveal.ref}
          initial={reveal.initial}
          animate={reveal.animate}
          variants={reveal.variants}
          className="max-w-xl mx-auto lg:mx-0"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-heading font-medium leading-[1.1] mb-6 lg:mb-8 uppercase tracking-wide drop-shadow-md lg:drop-shadow-none">
            Bringing Artistry to Every Piece of Wood
          </h1>
          <p className="text-white lg:text-brand-light/80 text-lg sm:text-xl lg:text-lg mb-10 lg:mb-12 leading-relaxed font-normal lg:font-light drop-shadow-md lg:drop-shadow-none">
            We specialize in creating custom woodwork that combines precision craftsmanship with timeless design, transforming your spaces into works of art.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link to="/quote" className="block w-full sm:w-auto text-center bg-brand-gold text-brand-dark px-8 py-4 font-semibold uppercase tracking-wider text-sm btn-fill-white transition-colors duration-300 rounded-sm">
                Request a quote
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link to="/services" className="block w-full sm:w-auto text-center border border-brand-light/30 text-brand-light px-8 py-4 font-semibold uppercase tracking-wider text-sm btn-fill-light transition-colors duration-300 rounded-sm">
                View Services
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}