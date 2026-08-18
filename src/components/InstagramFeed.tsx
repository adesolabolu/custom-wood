import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const INSTARGRAM_IMAGES = [
  'https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1533090481720-856c2e3e60ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1595514535415-8461413a9667?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

export function InstagramFeed() {
  return (
    <section className="py-24 bg-brand-light relative overflow-hidden">
      <div className="container mx-auto px-4 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl text-brand-dark mb-4">
            From the Workshop
          </h2>
          <p className="text-brand-dark/70 max-w-lg text-lg">
            Follow our daily craftsmanship, behind-the-scenes processes, and latest completed pieces on Instagram.
          </p>
        </div>
        <a 
          href="#" 
          className="flex items-center gap-2 text-brand-dark font-bold hover:text-brand-gold transition-colors uppercase tracking-wider text-sm border-b border-brand-dark/20 pb-1"
        >
          <Instagram size={18} /> @woodworked.inc
        </a>
      </div>

      <div className="flex w-full overflow-hidden">
        <motion.div 
          className="flex gap-4 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {/* Double the array for seamless infinite scroll */}
          {[...INSTARGRAM_IMAGES, ...INSTARGRAM_IMAGES].map((img, i) => (
            <div 
              key={i} 
              className="w-64 md:w-80 h-64 md:h-80 flex-shrink-0 group relative overflow-hidden rounded-sm cursor-pointer"
            >
              <img 
                src={img} 
                alt="Instagram feed item" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram size={32} className="text-brand-light" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
