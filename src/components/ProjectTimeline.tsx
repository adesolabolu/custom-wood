import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, TreePine, Hammer, Ruler, Droplets } from 'lucide-react';

const timelineSteps = [
  {
    title: "Design & Blueprinting",
    description: "Translating vision into precise technical drawings and establishing proportions.",
    icon: <PenTool size={24} />,
  },
  {
    title: "Timber Selection",
    description: "Sourcing and hand-picking the finest wood, ensuring grain and color harmony.",
    icon: <TreePine size={24} />,
  },
  {
    title: "Milling & Joinery",
    description: "Precision cutting and crafting traditional, robust joints for structural integrity.",
    icon: <Hammer size={24} />,
  },
  {
    title: "Assembly & Sanding",
    description: "Carefully putting the piece together and hand-sanding for a flawless, smooth surface.",
    icon: <Ruler size={24} />,
  },
  {
    title: "Finishing touches",
    description: "Applying premium oils or varnishes to protect the wood and enhance its natural beauty.",
    icon: <Droplets size={24} />,
  }
];

export function ProjectTimeline() {
  return (
    <div className="py-16 lg:py-24 border-t border-brand-dark/10">
      <div className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="mb-16">
          <p className="uppercase tracking-widest text-sm font-bold flex items-center gap-1 before:content-['['] after:content-[']'] text-brand-dark mb-4">
            Process
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium text-brand-dark">
            Stages of Craftsmanship
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] md:left-[35px] top-0 bottom-0 w-[1px] bg-brand-dark/20" />

          <div className="space-y-12 md:space-y-16">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex gap-6 md:gap-10"
              >
                {/* Icon Marker */}
                <div className="relative z-10 w-14 h-14 md:w-18 md:h-18 shrink-0 rounded-full bg-brand-light border border-brand-dark/20 flex items-center justify-center text-brand-dark shadow-sm">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="pt-2 md:pt-4">
                  <h3 className="text-xl md:text-2xl font-heading font-medium text-brand-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="text-brand-dark/70 text-base md:text-lg leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
