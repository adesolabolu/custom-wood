import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    quote: "Woodworking.Inc absolutely smashed it out of the park. The work was both timely and faultless, I have zero complaints.",
    author: "Mark Evans",
    project: "Kitchen Project"
  },
  {
    id: 2,
    quote: "The attention to detail on our custom dining table is breathtaking. It has completely transformed our living space.",
    author: "Sarah Jenkins",
    project: "Custom Furniture"
  },
  {
    id: 3,
    quote: "Professional from start to finish. They brought our complex architectural millwork designs to life with perfect precision.",
    author: "David Chen",
    project: "Commercial Build"
  }
];

export function Testimonials() {
  const reveal = useScrollReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  return (
    <section className="w-full py-20 md:py-32 bg-brand-light overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 lg:px-16 flex flex-col items-center text-center">
        <p className="uppercase tracking-widest text-sm font-bold flex items-center gap-1 before:content-['['] after:content-[']'] mb-16">
          Testimonials
        </p>

        <motion.div 
          ref={reveal.ref}
          initial={reveal.initial}
          animate={reveal.animate}
          variants={reveal.variants}
          className="max-w-5xl mx-auto relative w-full flex items-center justify-between"
        >
          <motion.button 
            onClick={prevTestimonial}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="hidden md:flex w-12 h-12 bg-brand-brown text-white items-center justify-center btn-fill-dark transition-colors rounded-sm shrink-0 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="px-4 md:px-12 flex-grow overflow-hidden relative min-h-[300px] sm:min-h-[250px] md:min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute w-full px-2"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading leading-tight mb-8 text-brand-dark font-medium">
                  "{testimonials[currentIndex].quote}"
                </h3>
                
                <div className="flex flex-col items-center">
                  <p className="font-semibold text-xs md:text-sm tracking-widest uppercase mb-1">{testimonials[currentIndex].author}</p>
                  <p className="text-brand-dark/80 text-xs md:text-sm">{testimonials[currentIndex].project}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button 
            onClick={nextTestimonial}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="hidden md:flex w-12 h-12 bg-brand-brown text-white items-center justify-center hover:bg-brand-dark transition-colors rounded-sm shrink-0 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </motion.button>
        </motion.div>

        {/* Mobile buttons */}
        <div className="flex md:hidden gap-4 mt-8">
          <motion.button 
            onClick={prevTestimonial}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="w-12 h-12 bg-brand-brown text-white flex items-center justify-center hover:bg-brand-dark transition-colors rounded-sm shrink-0"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button 
            onClick={nextTestimonial}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="w-12 h-12 bg-brand-brown text-white flex items-center justify-center hover:bg-brand-dark transition-colors rounded-sm shrink-0"
            aria-label="Next testimonial"
          >
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
