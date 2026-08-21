import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Types ---
interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Data ---
const testimonials: Testimonial[] = [
  {
    text: "Woodworking.Inc completely transformed our kitchen. The custom cabinetry is breathtaking, combining practical storage with stunning visual appeal.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Briana Patton",
    role: "Homeowner",
  },
  {
    text: "The attention to detail on our custom dining table is unmatched. It has become the warm, inviting heart of our home where our family gathers.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Bilal Ahmed",
    role: "Interior Designer",
  },
  {
    text: "Professional from start to finish. They brought our complex architectural millwork designs to life with perfect precision and sustainable timber.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Saman Malik",
    role: "Lead Architect",
  },
  {
    text: "Our bespoke bathroom vanities are incredible. The moisture-resistant, masterfully crafted woodwork adds so much warmth to our private sanctuary.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Omar Raza",
    role: "Property Developer",
  },
  {
    text: "The craftsmanship in our new library shelves is outstanding. The rich wood tones and flawless joinery exceeded all our expectations.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Zainab Hussain",
    role: "Homeowner",
  },
  {
    text: "Working with this team was an absolute pleasure. They took our vague concepts and delivered premium, handcrafted seating for our restaurant.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aliza Khan",
    role: "Restaurant Owner",
  },
  {
    text: "The custom doors they built for our entryway make a massive statement. True artisanal quality that you just can't find anywhere else today.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Farhan Siddiqui",
    role: "Homeowner",
  },
  {
    text: "Every piece of timber was selected with care. The floating staircase they designed and built is nothing short of a modern masterpiece.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sana Sheikh",
    role: "Architectural Designer",
  },
  {
    text: "From the initial consultation to final installation, the process was seamless. Our custom walk-in closets are both functional and gorgeous.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Hassan Ali",
    role: "Homeowner",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-8 md:p-10 rounded-2xl md:rounded-3xl border border-brand-dark/10 shadow-lg shadow-brand-dark/5 max-w-xs w-full bg-brand-accent text-brand-dark transition-all duration-300 cursor-default select-none group" 
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-brand-dark/85 leading-relaxed font-normal m-0 transition-colors duration-300 text-sm md:text-base">
                      {text}
                    </p>
                    <footer className="flex items-center gap-3 mt-6">
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-brand-dark/15 group-hover:ring-brand-gold/80 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold text-sm uppercase tracking-wider not-italic leading-5 text-brand-dark transition-colors duration-300">
                          {name}
                        </cite>
                        <span className="text-xs leading-5 tracking-tight text-brand-dark/65 mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export function Testimonials() {
  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-brand-light py-20 md:py-32 relative overflow-hidden w-full"
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "50px" }}
        transition={{ 
          duration: 0.4, 
          ease: [0.16, 1, 0.3, 1],
        }}
        className="max-w-[1600px] mx-auto px-8 md:px-12 lg:px-16 z-10"
      >
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <p className="uppercase tracking-widest text-sm font-bold flex items-center gap-1 before:content-['['] after:content-[']'] text-brand-dark">
              Testimonials
            </p>
          </div>

          <h2 id="testimonials-heading" className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-center text-brand-dark transition-colors leading-tight">
            What our clients say
          </h2>
          <p className="text-center mt-5 text-brand-dark/80 text-lg leading-relaxed max-w-sm transition-colors">
            Discover how we've transformed spaces with custom craftsmanship.
          </p>
        </div>

        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={35} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={45} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={40} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-16 flex items-center justify-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center">
            <Link to="/quote" className="uppercase text-xs font-semibold tracking-wider border border-brand-dark/20 px-8 md:px-10 py-4 btn-fill-dark transition-colors flex items-center justify-center gap-2 h-[50px] min-w-[220px] rounded-sm text-brand-dark whitespace-nowrap">
              Get a free quote now <ChevronRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
