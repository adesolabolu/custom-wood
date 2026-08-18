import { motion } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { servicesList as services } from '../data/services';

import { Breadcrumbs } from '../components/Breadcrumbs';

const faqs = [
  {
    question: "Where do you source your materials?",
    answer: "Sustainable sourcing meets masterful execution in every project we take on. Experience the warmth and natural beauty of premium timber beneath your feet. From elegant cabinetry to structural enhancements, we bring an artisan's touch to modern living."
  },
  {
    question: "How long do your projects take?",
    answer: "We transform raw timber into refined architectural elements that stand the test of time. Transform your bathroom into a tranquil retreat with custom wood vanities and elegant shelving. Sustainable sourcing meets masterful execution in every project we take on."
  },
  {
    question: "Can you account for lower budgets?",
    answer: "Our custom kitchens combine practical storage solutions with stunning visual appeal. Moisture-resistant, masterfully crafted woodwork that adds warmth to your private sanctuary. We transform raw timber into refined architectural elements that stand the test of time."
  },
  {
    question: "Is there an opportunity for feedback?",
    answer: "Experience culinary inspiration surrounded by handcrafted cabinetry and flawless countertops. Bespoke bathroom cabinetry designed for optimal organization and spa-like luxury. Our custom kitchens combine practical storage solutions with stunning visual appeal."
  }
];

export function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-24 lg:pt-32 bg-brand-light min-h-screen">
      {/* Intro Layout One */}
      <section className="py-16 lg:py-32 px-8 md:px-12 lg:px-16 max-w-[1600px] mx-auto text-center flex flex-col items-center">
        <div className="w-full text-left">
          <Breadcrumbs />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-1 before:content-['['] after:content-[']'] mb-8 text-brand-dark">
            EXPLORE OUR OFFERINGS
          </p>
          <h1 className="text-5xl lg:text-7xl font-heading mb-6 tracking-tight text-brand-dark">Our Services</h1>
          <p className="max-w-2xl mx-auto text-lg text-brand-dark/80">
            From grand entryways to stunning pergolas, we extend our craftsmanship to the great outdoors.
            We design and build spaces that serve as the warm, inviting heart of your home.
          </p>
        </motion.div>
      </section>

      {/* Navigation Layout One */}
      <section className="px-4 md:px-8 lg:px-16 max-w-[1600px] mx-auto pb-16 lg:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <Link key={service.slug} to={`/services/${service.slug}`} className="block group">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative h-[400px] rounded-xl overflow-hidden bg-brand-dark/10"
              >
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-brand-dark/40 transition-colors duration-300" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl text-brand-light font-heading tracking-wide mb-2">{service.name}</h3>
                  <div className="flex items-center gap-2 text-brand-light/80 uppercase text-xs tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                    Explore <ChevronRight size={16} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Layout One */}
      <section className="py-16 lg:py-32 px-8 md:px-12 lg:px-16 bg-brand-light">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl lg:text-5xl font-heading leading-tight text-brand-dark">
              Looking for<br/>some <span className="opacity-70">answers</span>?
            </h2>
            <p className="uppercase tracking-widest text-xs font-bold flex items-center gap-1 before:content-['['] after:content-[']']">
              FAQS
            </p>
            <div className="mt-8 rounded-2xl overflow-hidden h-[300px] lg:h-[400px]">
              <img 
                src="https://res.cloudinary.com/drzh5dzha/image/upload/v1782491554/woodwork_template/669692028c51930cb1f1e774_pexels-heyho-7046169.webp" 
                alt="Woodworking FAQ"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border-b border-brand-dark/10 py-6 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex justify-between items-center gap-4">
                  <h4 className="text-xl font-heading text-brand-dark">{faq.question}</h4>
                  <ChevronDown 
                    className={`shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="pt-4 text-brand-dark/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 lg:py-32 px-8 md:px-12 lg:px-16 overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 bg-brand-dark">
          <img 
            src="https://res.cloudinary.com/drzh5dzha/image/upload/v1782491729/woodwork_template/669e2bfdc58ba40ac89d5524_pexels-heyho-8143944%20%281%29.webp"
            alt="Parallax background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading text-brand-light mb-12">
            Enquire now for a free quote
          </h2>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-4 bg-brand-light text-brand-dark px-10 py-5 font-bold uppercase tracking-wider btn-fill-dark transition-colors rounded-sm text-sm"
            >
              Inquire now <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
