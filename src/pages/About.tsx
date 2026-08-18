import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';

const faqs = [
  {
    question: "How long has Woodworking.Inc been in business?",
    answer: "We have been handcrafting perfection since 1967. Over the decades, we've refined our techniques while staying true to our core values of quality and precision."
  },
  {
    question: "Do you offer custom designs?",
    answer: "Absolutely. Every piece of custom furniture begins its journey in our workshop. We work closely with our clients to bring their unique visions to life."
  },
  {
    question: "Where do you source your materials?",
    answer: "We source only the finest sustainable materials, ensuring each creation is not only beautiful but environmentally responsible. We believe in ethical and sustainable woodworking."
  },
  {
    question: "What is your typical turnaround time?",
    answer: "Turnaround times vary depending on the scope and complexity of the project. A simple custom table might take 4-6 weeks, while a full kitchen fit-out could take 10-14 weeks."
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function About() {
  const containerRef = useRef(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "20%"]);
  const workshopY = useTransform(scrollYProgress, [0.1, 0.4], ["10%", "-10%"]);

  return (
    <div ref={containerRef} className="pt-24 lg:pt-32 bg-brand-light min-h-screen">
      {/* 1. About Intro / Hero Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 lg:py-24 max-w-[1600px] mx-auto overflow-hidden">
        <Breadcrumbs />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="uppercase tracking-widest text-sm font-bold flex items-center gap-4 before:content-['['] after:content-[']'] mb-10">
              About Us
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium leading-tight text-brand-dark mb-6">
              A LEGACY OF <span className="text-brand-brown">EXCEPTIONAL</span> CRAFTSMANSHIP
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-brand-dark/80 text-lg leading-relaxed mb-8 max-w-lg">
              For generations, we have been turning raw timber into functional works of art. Our passion for woodworking is matched only by our dedication to quality, precision, and the timeless beauty of natural materials.
            </motion.p>
          </motion.div>
          <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden group">
            <motion.img 
              style={{ y: heroY, scale: 1.1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              src="https://res.cloudinary.com/drzh5dzha/image/upload/v1782491501/woodwork_template/66968f6bacdd554c9b6decad_pexels-heyho-6758534.webp" 
              alt="About our workshop" 
              className="w-full h-full object-cover origin-center"
            />
          </div>
        </div>
      </section>

      {/* 2. Split Image & Text Layout Block */}
      <section className="bg-brand-brown text-brand-light py-20 lg:py-32 overflow-hidden relative">
        <div className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="h-[400px] lg:h-[600px] rounded-2xl overflow-hidden order-2 lg:order-1 relative">
            <motion.div className="absolute inset-0 bg-brand-dark/20 z-10" />
            <motion.img
              style={{ y: workshopY, scale: 1.15 }}
              src="https://res.cloudinary.com/drzh5dzha/image/upload/v1782662436/18365789-540d-4e5e-93c5-793402e2aff5.png"
              alt="Workshop Presentation"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="order-1 lg:order-2"
          >
            <motion.p variants={fadeInUp} className="uppercase tracking-widest text-sm font-bold flex items-center gap-4 before:content-['['] after:content-[']'] mb-10">
              Our Workshop
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium leading-tight mb-8">
              WHERE TRADITION MEETS MODERN PRECISION
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-brand-light/80 text-lg leading-relaxed">
              Every piece of custom furniture begins its journey in our workshop. Here, master carpenters combine time-honored techniques with state-of-the-art tools to achieve unparalleled results. We source only the finest sustainable materials, ensuring each creation is not only beautiful but environmentally responsible.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 3. "Our Process" Grid Cards */}
      <section className="pt-20 lg:pt-32 pb-10 lg:pb-16 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-4 before:content-['['] after:content-[']'] text-brand-dark mb-10">
            How We Work
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium text-brand-dark">
            OUR PROCESS FOR RELIABLE SUCCESS
          </h2>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="relative"
        >
          {/* Horizontal Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-brand-dark/20 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'Experience the warmth and natural beauty of premium timber beneath your feet.', icon: 'https://cdn.prod.website-files.com/6687bb58d107108aa401e5aa/668d4d370e1be593aa9351fd_abstract%20(3)%20(2).svg' },
              { step: '02', title: 'Planning', desc: 'Transform your bathroom into a tranquil retreat with custom wood vanities and elegant shelving.', icon: 'https://cdn.prod.website-files.com/6687bb58d107108aa401e5aa/668d4d37c9d000d6d3e5e442_abstract%20(4)%20(1).svg' },
              { step: '03', title: 'Construction', desc: 'Moisture-resistant, masterfully crafted woodwork that adds warmth to your private sanctuary.', icon: 'https://cdn.prod.website-files.com/6687bb58d107108aa401e5aa/668d4d37c6353227e6fc0f4a_abstract%20(2)%20(1).svg' },
              { step: '04', title: 'Review', desc: 'Bespoke bathroom cabinetry designed for optimal organization and spa-like luxury.', icon: 'https://cdn.prod.website-files.com/6687bb58d107108aa401e5aa/668d4d372589b149e514bf0d_abstract%20(1)%20(1).svg' }
            ].map((item, index) => (
              <motion.div 
                key={item.step}
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center group h-full"
              >
                {/* Step Circle */}
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-24 h-24 rounded-full bg-brand-light border-4 border-white shadow-xl flex items-center justify-center mb-8 relative z-10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img src={item.icon} alt={item.title} className="w-10 h-10 group-hover:rotate-180 transition-transform duration-600" />
                </motion.div>

                {/* Content Card */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-brand-dark/5 group-hover:border-brand-gold/30 group-hover:shadow-xl transition-all duration-300 relative w-full overflow-hidden group-hover:-translate-y-2 flex-grow flex flex-col">
                  <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold/0 group-hover:bg-brand-gold transition-colors duration-300" />
                  <p className="text-sm font-semibold tracking-widest text-brand-gold mb-3">STEP {item.step}</p>
                  <h3 className="text-2xl font-heading font-medium text-brand-dark mb-4">{item.title}</h3>
                  <p className="text-brand-dark/80 text-base leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. FAQ Accordion Section */}
      <section className="py-16 lg:py-32 px-6 md:px-12 lg:px-24 max-w-[1200px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-4 before:content-['['] after:content-[']'] text-brand-dark mb-6">
            Common Questions
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium text-brand-dark">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="border-b border-brand-dark/10 py-6 cursor-pointer"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <div className="flex justify-between items-center gap-4">
                <h4 className="text-xl md:text-2xl font-heading text-brand-dark font-medium">{faq.question}</h4>
                <ChevronDown 
                  className={`shrink-0 text-brand-brown transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                />
              </div>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-6 text-brand-dark/80 text-lg leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Team Showcase Profile Block */}
      <section className="pt-8 lg:pt-16 pb-16 lg:pb-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto bg-brand-light">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-4 before:content-['['] after:content-[']'] text-brand-dark mb-10">
            Meet the Team
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium text-brand-dark">
            THE FACES BEHIND THE MAGIC
          </h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 lg:gap-16 justify-items-center"
        >
          {[
            { name: 'Alistair Vance', role: 'Master Carpenter', img: 'https://i.pinimg.com/1200x/b5/8e/74/b58e74582a0274d64f9a9d8fab8b8a28.jpg' },
            { name: 'Marcus Brody', role: 'Lead Designer', img: 'https://i.pinimg.com/1200x/b5/8e/74/b58e74582a0274d64f9a9d8fab8b8a28.jpg' },
            { name: 'Elena Rostova', role: 'Finishing Specialist', img: 'https://i.pinimg.com/1200x/c0/92/01/c092013329f6f6fcd43cd0fafae95109.jpg' }
          ].map((member, i) => (
            <motion.div 
              key={member.name}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group cursor-pointer flex flex-col items-center text-center w-full max-w-xs"
            >
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 border-4 border-white shadow-xl relative">
                <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-heading font-medium text-brand-dark mb-2">{member.name}</h3>
              <p className="text-brand-brown font-semibold tracking-wider text-sm uppercase">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. Action Call-To-Target Banner */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://res.cloudinary.com/drzh5dzha/image/upload/v1782491729/woodwork_template/669e2bfdc58ba40ac89d5524_pexels-heyho-8143944%20%281%29.webp" 
            alt="CTA Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-[2px]" />
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium text-brand-light mb-8">
            READY TO START YOUR PROJECT?
          </motion.h2>
          <motion.div variants={fadeInUp}>
            <a href="/quote" className="inline-flex items-center gap-4 bg-brand-gold text-brand-dark px-10 py-5 font-bold uppercase tracking-wider btn-fill-white transition-colors rounded-sm text-sm hover:scale-105 active:scale-95 duration-200">
              Get a Quote <ChevronRight size={18} />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

