import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Testimonials } from '../components/Testimonials';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { Breadcrumbs } from '../components/Breadcrumbs';

const servicesData: Record<string, any> = {
  kitchens: {
    heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop',
    heroSubtitle: 'Joinery services for kitchens',
    heroTitle: 'Kitchens',
    introSubtitle: 'Enhance your cooking space',
    introTitle: 'The ideal location to add some natural flair',
    introText: 'Moisture-resistant, masterfully crafted woodwork that adds warmth to your private sanctuary.',
    introImage: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=800&auto=format&fit=crop',
    featuresSubtitle: 'What we can do',
    featuresTitle: 'A great kitchen space finishes a home',
    featuresImage: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=800&auto=format&fit=crop',
    features: [
      { id: '01', title: 'Countertops', desc: 'Experience culinary inspiration surrounded by handcrafted cabinetry and flawless countertops.' },
      { id: '02', title: 'Backing', desc: 'We design and build kitchen spaces that serve as the warm, inviting heart of your home.' },
      { id: '03', title: 'Panelling', desc: 'Each piece of custom furniture is thoughtfully designed to become a cherished family heirloom.' },
      { id: '04', title: 'Cabinetry', desc: 'Experience the comfort and elegance of bespoke seating, tables, and bedroom suites.' },
      { id: '05', title: 'Flooring', desc: 'Our artisanal approach ensures your furniture perfectly matches your lifestyle and taste.' },
      { id: '06', title: 'Decoration', desc: 'Rich, durable hardwood flooring expertly installed to elevate the character of any room.' }
    ],
    faqsImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop',
    ctaImage: 'https://images.unsplash.com/photo-1556911073-a517e752729c?q=80&w=800&auto=format&fit=crop'
  },
  bathrooms: {
    heroImage: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1200&auto=format&fit=crop',
    heroSubtitle: 'Joinery services for bathrooms',
    heroTitle: 'Bathrooms',
    introSubtitle: 'Make your bathroom a special place',
    introTitle: 'Tiling is out, wood is in',
    introText: 'Enhance your property\'s exterior with robust and beautiful custom timber structures.',
    introImage: 'https://images.unsplash.com/photo-1604709177227-3977c3565b04?q=80&w=800&auto=format&fit=crop',
    featuresSubtitle: 'What we can do',
    featuresTitle: 'A perfect waterproof finish',
    featuresImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    features: [
      { id: '01', title: 'Cabinetry', desc: 'Each piece of custom furniture is thoughtfully designed to become a cherished family heirloom.' },
      { id: '02', title: 'Countertops', desc: 'Experience the comfort and elegance of bespoke seating, tables, and bedroom suites.' },
      { id: '03', title: 'Panelling', desc: 'Our artisanal approach ensures your furniture perfectly matches your lifestyle and taste.' },
      { id: '04', title: 'Flooring', desc: 'Rich, durable hardwood flooring expertly installed to elevate the character of any room.' },
      { id: '05', title: 'Waterproofing', desc: 'We meticulously lay and finish every floorboard to create a seamless, beautiful surface.' },
      { id: '06', title: 'Aftercare', desc: 'Experience the warmth and natural beauty of premium timber beneath your feet.' }
    ],
    faqsImage: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800&auto=format&fit=crop',
    ctaImage: 'https://images.unsplash.com/photo-1604709177227-3977c3565b04?q=80&w=800&auto=format&fit=crop'
  },
  cabinetry: {
    heroImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934440/woodwork-temp-db/cabinetry_hero_1782931469732.jpg',
    heroSubtitle: 'Custom built-in solutions',
    heroTitle: 'Cabinetry',
    introSubtitle: 'Storage that makes a statement',
    introTitle: 'Beautiful utility for every room',
    introText: 'Our bespoke cabinetry solutions blend flawless design with practical functionality for living spaces, kitchens, and studies.',
    introImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934441/woodwork-temp-db/cabinetry_intro_1782931480286.jpg',
    featuresSubtitle: 'Our expertise',
    featuresTitle: 'Masterful woodworking',
    featuresImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934438/woodwork-temp-db/cabinetry_features_1782931496877.jpg',
    features: [
      { id: '01', title: 'Built-ins', desc: 'Custom built-in wardrobes and shelving units.' },
      { id: '02', title: 'Finishing', desc: 'Premium varnishes, paints, and protective coats.' },
      { id: '03', title: 'Hardware', desc: 'Top of the line hinges, handles, and runners.' },
      { id: '04', title: 'Design', desc: '3D modeling to perfectly match your space.' },
      { id: '05', title: 'Installation', desc: 'Professional, clean, and seamless fitting.' },
      { id: '06', title: 'Materials', desc: 'Sustainably sourced, high-grade timbers.' }
    ],
    faqsImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934437/woodwork-temp-db/cabinetry_faqs_1782931509177.jpg',
    ctaImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934436/woodwork-temp-db/cabinetry_cta_1782931522037.jpg'
  },
  tables: {
    heroImage: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1200&auto=format&fit=crop',
    heroSubtitle: 'Handcrafted wooden tables',
    heroTitle: 'Tables',
    introSubtitle: 'The centerpiece of your home',
    introTitle: 'Gather around quality',
    introText: 'From grand dining tables to elegant coffee tables, we craft surfaces meant to be shared and cherished.',
    introImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop',
    featuresSubtitle: 'What we offer',
    featuresTitle: 'Tables for every occasion',
    featuresImage: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=800&auto=format&fit=crop',
    features: [
      { id: '01', title: 'Dining', desc: 'Large, durable tables for family gatherings.' },
      { id: '02', title: 'Coffee', desc: 'Elegant centerpieces for your living room.' },
      { id: '03', title: 'Side', desc: 'Functional and beautiful accent pieces.' },
      { id: '04', title: 'Office', desc: 'Sturdy, inspiring desks for your workspace.' },
      { id: '05', title: 'Outdoor', desc: 'Weather-resistant tables for patios.' },
      { id: '06', title: 'Custom', desc: 'Unique designs tailored to your specifications.' }
    ],
    faqsImage: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=800&auto=format&fit=crop',
    ctaImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop'
  },
  seating: {
    heroImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934469/woodwork-temp-db/seating_hero_1782932406654.jpg',
    heroSubtitle: 'Bespoke wooden seating',
    heroTitle: 'Seating',
    introSubtitle: 'Comfort meets craftsmanship',
    introTitle: 'Take a seat in style',
    introText: 'We design and build chairs, benches, and stools that provide exceptional comfort and striking aesthetic appeal.',
    introImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934470/woodwork-temp-db/seating_intro_1782932422668.jpg',
    featuresSubtitle: 'Our seating range',
    featuresTitle: 'Crafted for comfort',
    featuresImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934468/woodwork-temp-db/seating_features_1782932439052.jpg',
    features: [
      { id: '01', title: 'Chairs', desc: 'Dining and accent chairs with perfect ergonomics.' },
      { id: '02', title: 'Benches', desc: 'Sturdy and stylish benches for indoors and out.' },
      { id: '03', title: 'Stools', desc: 'Bar and counter stools built to last.' },
      { id: '04', title: 'Upholstery', desc: 'Integration with premium fabrics and leathers.' },
      { id: '05', title: 'Joinery', desc: 'Traditional joints for maximum strength.' },
      { id: '06', title: 'Finishes', desc: 'Smooth, tactile surfaces that invite touch.' }
    ],
    faqsImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934466/woodwork-temp-db/seating_faqs_1782932453803.jpg',
    ctaImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934465/woodwork-temp-db/seating_cta_1782932468754.jpg'
  },
  closets: {
    heroImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934446/woodwork-temp-db/closets_hero_1782931446588.jpg',
    heroSubtitle: 'Custom wardrobe solutions',
    heroTitle: 'Closets',
    introSubtitle: 'Organize your life',
    introTitle: 'Storage that works for you',
    introText: 'Transform your bedroom or dressing area with custom closets designed to maximize space and showcase your wardrobe.',
    introImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop',
    featuresSubtitle: 'Closet features',
    featuresTitle: 'Intelligent organization',
    featuresImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop',
    features: [
      { id: '01', title: 'Walk-ins', desc: 'Luxurious walk-in closets with custom islands.' },
      { id: '02', title: 'Reach-ins', desc: 'Efficient use of space for smaller rooms.' },
      { id: '03', title: 'Drawers', desc: 'Soft-close drawers with custom dividers.' },
      { id: '04', title: 'Lighting', desc: 'Integrated LED lighting for perfect visibility.' },
      { id: '05', title: 'Accessories', desc: 'Pull-out racks, mirrors, and valet rods.' },
      { id: '06', title: 'Doors', desc: 'Sliding or hinged doors in various finishes.' }
    ],
    faqsImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934444/woodwork-temp-db/closets_faqs_1782932375459.jpg',
    ctaImage: 'https://images.unsplash.com/photo-1558904541-efa843a96f09?q=80&w=800&auto=format&fit=crop'
  },
  doors: {
    heroImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934459/woodwork-temp-db/doors_hero_1782931549081.jpg',
    heroSubtitle: 'Interior and exterior doors',
    heroTitle: 'Doors',
    introSubtitle: 'Make an entrance',
    introTitle: 'The gateway to your space',
    introText: 'Crafted with precision and built for security, our custom doors add architectural interest and value to your property.',
    introImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934461/woodwork-temp-db/doors_intro_1782931561718.jpg',
    featuresSubtitle: 'Door varieties',
    featuresTitle: 'Open up to possibilities',
    featuresImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934457/woodwork-temp-db/doors_features_1782931572074.jpg',
    features: [
      { id: '01', title: 'Entry', desc: 'Grand, secure front doors that make a statement.' },
      { id: '02', title: 'Interior', desc: 'Solid wood interior doors for privacy and style.' },
      { id: '03', title: 'French', desc: 'Classic French doors to let the light in.' },
      { id: '04', title: 'Sliding', desc: 'Space-saving sliding and pocket doors.' },
      { id: '05', title: 'Hardware', desc: 'Integration with premium locks and handles.' },
      { id: '06', title: 'Finishing', desc: 'Weather-resistant finishes for exterior doors.' }
    ],
    faqsImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934456/woodwork-temp-db/doors_faqs_1782931584912.jpg',
    ctaImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934455/woodwork-temp-db/doors_cta_1782931598432.jpg'
  },
  millwork: {
    heroImage: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?q=80&w=1200&auto=format&fit=crop',
    heroSubtitle: 'Architectural millwork',
    heroTitle: 'Millwork',
    introSubtitle: 'The finishing touches',
    introTitle: 'Elevate your interior architecture',
    introText: 'From crown molding to wainscoting, our custom millwork adds character, depth, and historic charm to any room.',
    introImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    featuresSubtitle: 'Our capabilities',
    featuresTitle: 'Detailing that defines a space',
    featuresImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    features: [
      { id: '01', title: 'Molding', desc: 'Custom crown, base, and casing profiles.' },
      { id: '02', title: 'Wainscoting', desc: 'Elegant wall paneling for dining rooms and hallways.' },
      { id: '03', title: 'Stairs', desc: 'Stunning wooden staircases and balustrades.' },
      { id: '04', title: 'Mantels', desc: 'Custom fireplace surrounds and mantels.' },
      { id: '05', title: 'Beams', desc: 'Decorative ceiling beams for a rustic touch.' },
      { id: '06', title: 'Trim', desc: 'Window and door trim to complete the look.' }
    ],
    faqsImage: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?q=80&w=800&auto=format&fit=crop',
    ctaImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop'
  },
  cnc: {
    heroImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934451/woodwork-temp-db/cnc_hero_1782854971708.jpg',
    heroSubtitle: 'Precision CNC routing',
    heroTitle: 'CNC Services',
    introSubtitle: 'Technology meets craftsmanship',
    introTitle: 'Exact replication and complex geometries',
    introText: 'We utilize advanced CNC technology to produce intricate patterns, precise components, and scalable production runs.',
    introImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934452/woodwork-temp-db/cnc_intro_1782854983262.jpg',
    featuresSubtitle: 'CNC capabilities',
    featuresTitle: 'Limitless design potential',
    featuresImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934450/woodwork-temp-db/cnc_features_1782854993328.jpg',
    features: [
      { id: '01', title: 'Routing', desc: 'Precise cutting of complex 2D and 3D shapes.' },
      { id: '02', title: 'Engraving', desc: 'Detailed engraving for signage and decoration.' },
      { id: '03', title: 'Prototyping', desc: 'Rapid prototyping for product development.' },
      { id: '04', title: 'Production', desc: 'Consistent, high-volume part production.' },
      { id: '05', title: 'Materials', desc: 'Working with wood, MDF, plastics, and more.' },
      { id: '06', title: 'Design', desc: 'CAD/CAM design services to bring ideas to life.' }
    ],
    faqsImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934449/woodwork-temp-db/cnc_faqs_1782855007630.jpg',
    ctaImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782934447/woodwork-temp-db/cnc_cta_1782855021094.jpg'
  },
  commercial: {
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    heroSubtitle: 'Commercial fit-outs and joinery',
    heroTitle: 'Commercial',
    introSubtitle: 'Impress your clients',
    introTitle: 'Workspaces that inspire',
    introText: 'We partner with architects and designers to deliver high-end commercial fit-outs for retail, hospitality, and corporate environments.',
    introImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop',
    featuresSubtitle: 'Commercial services',
    featuresTitle: 'Built for business',
    featuresImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop',
    features: [
      { id: '01', title: 'Retail', desc: 'Custom display fixtures and point-of-sale counters.' },
      { id: '02', title: 'Hospitality', desc: 'Bar fit-outs, restaurant seating, and reception desks.' },
      { id: '03', title: 'Office', desc: 'Boardroom tables, workstations, and acoustic paneling.' },
      { id: '04', title: 'Scale', desc: 'Capacity for large-scale, multi-site rollouts.' },
      { id: '05', title: 'Compliance', desc: 'Adherence to commercial building codes and standards.' },
      { id: '06', title: 'Project Mgt', desc: 'End-to-end project management for timely delivery.' }
    ],
    faqsImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    ctaImage: 'https://images.unsplash.com/photo-1497215848147-393f958f2d59?q=80&w=800&auto=format&fit=crop'
  }
};

const commonFaqs = [
  {
    question: "Where do you source your materials?",
    answer: "Sustainable sourcing meets masterful execution in every project we take on. Experience the warmth and natural beauty of premium timber beneath your feet."
  },
  {
    question: "How long do your projects take?",
    answer: "We transform raw timber into refined architectural elements that stand the test of time. Transform your space into a tranquil retreat."
  },
  {
    question: "Can you account for lower budgets?",
    answer: "Our custom services combine practical storage solutions with stunning visual appeal. Moisture-resistant, masterfully crafted woodwork that adds warmth to your sanctuary."
  },
  {
    question: "Is there an opportunity for feedback?",
    answer: "Experience culinary and living inspiration surrounded by handcrafted cabinetry and flawless countertops. Bespoke features designed for optimal organization and luxury."
  }
];

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heroRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // GSAP Parallax setup for hero
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const img = document.querySelector('.parallax-hero-img');
      if (img && heroRef.current) {
        gsap.to(img, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
      
      gsap.utils.toArray('.parallax-bg').forEach((bg: any) => {
        gsap.to(bg, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: bg.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [slug]);

  const data = servicesData[(slug as keyof typeof servicesData)] || servicesData.kitchens;
  
  // Get 3 similar services
  const similarServicesKeys = Object.keys(servicesData).filter(s => s !== slug).slice(0, 3);

  return (
    <div className="bg-brand-light min-h-screen" ref={containerRef}>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Hero Layout */}
      <section ref={heroRef} className="relative w-full h-[60vh] lg:h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute top-24 md:top-32 left-6 md:left-12 z-20">
          <Breadcrumbs theme="light" />
        </div>

        <div className="absolute inset-0 bg-brand-dark z-0 overflow-hidden">
          <img 
            src={data.heroImage} 
            alt={data.heroTitle}
            className="w-full h-[120%] absolute -top-[10%] left-0 object-cover opacity-60 parallax-hero-img"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-brand-light px-6"
        >
          <div className="uppercase tracking-widest text-xs font-bold mb-6 before:content-['['] after:content-[']']">
            {data.heroSubtitle}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading tracking-tight uppercase">
            {data.heroTitle}
          </h1>
        </motion.div>
      </section>

      {/* Intro Text Layout Three */}
      <section className="py-20 lg:py-32 px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="uppercase tracking-widest text-xs font-bold mb-6 before:content-['['] after:content-[']'] text-brand-dark/70">
              {data.introSubtitle}
            </div>
            <h2 className="text-4xl lg:text-5xl font-heading text-brand-dark leading-tight mb-8">
              {data.introTitle}
            </h2>
            <p className="text-lg text-brand-dark/80 mb-10 leading-relaxed max-w-xl">
              {data.introText}
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-4 bg-brand-dark text-brand-light px-8 py-4 font-bold uppercase tracking-wider btn-fill-light transition-colors rounded-sm text-sm"
              >
                Get a quote now <ChevronRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
          <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-[600px] w-full lg:w-4/5 lg:ml-auto">
            <img 
              src={data.introImage} 
              alt={data.introTitle}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Features Grid Text Layout Seven */}
      <section className="bg-brand-light py-20 lg:py-32 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="uppercase tracking-widest text-xs font-bold mb-6 before:content-['['] after:content-[']'] text-brand-dark/70">
                {data.featuresSubtitle}
              </div>
              <h2 className="text-4xl lg:text-5xl font-heading text-brand-dark leading-tight mb-12 max-w-xl">
                {data.featuresTitle}
              </h2>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-4 border border-brand-dark/20 text-brand-dark px-8 py-4 font-bold uppercase tracking-wider btn-fill-dark transition-colors rounded-sm text-sm"
                >
                  Get a quote now <ChevronRight size={18} />
                </Link>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              {data.features.map((feature: any, index: number) => (
                <motion.div 
                  key={feature.id} 
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="uppercase tracking-widest text-xs font-bold before:content-['['] after:content-[']'] text-brand-dark/60">
                    {feature.id}
                  </div>
                  <h4 className="text-2xl font-heading text-brand-dark">{feature.title}</h4>
                  <p className="text-brand-dark/80 leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Image */}
      <section className="w-full h-[50vh] lg:h-[70vh] relative overflow-hidden">
        <img 
          src={data.featuresImage} 
          alt="Parallax"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/20" />
      </section>

      {/* FAQ Layout One */}
      <section className="py-20 lg:py-32 px-6 md:px-12 lg:px-16 bg-brand-light">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl lg:text-5xl font-heading leading-tight text-brand-dark">
              Looking for<br/>some <span className="text-brand-brown">answers</span>?
            </h2>
            <p className="uppercase tracking-widest text-xs font-bold flex items-center gap-1 before:content-['['] after:content-[']']">
              FAQS
            </p>
            <div className="mt-8 rounded-2xl overflow-hidden h-[300px] lg:h-[400px]">
              <img 
                src={data.faqsImage} 
                alt="FAQ"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {commonFaqs.map((faq, index) => (
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

      {/* Similar Services */}
      <section className="bg-brand-light px-6 md:px-12 lg:px-16 py-16 lg:py-24 border-t border-brand-dark/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-brand-dark">Similar Services</h2>
            <Link to="/services" className="hidden sm:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-dark hover:text-brand-brown transition-colors">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarServicesKeys.map((s, i) => {
              const service = servicesData[s];
              return (
                <Link key={s} to={`/services/${s}`} className="group block">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="rounded-2xl overflow-hidden mb-6 aspect-[4/3]">
                      <img 
                        src={service.heroImage} 
                        alt={service.heroTitle} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    <p className="uppercase tracking-widest text-xs font-bold mb-3 flex items-center gap-1 before:content-['['] after:content-[']'] text-brand-dark/70">
                      {service.heroSubtitle}
                    </p>
                    <h3 className="text-xl font-heading font-medium text-brand-dark group-hover:text-brand-brown transition-colors">
                      {service.heroTitle}
                    </h3>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Banner with tabs */}
      <section className="relative py-32 px-6 md:px-12 lg:px-16 overflow-hidden flex flex-col justify-center min-h-[70vh]">
        <div className="absolute inset-0 bg-brand-dark overflow-hidden">
          <img 
            src={data.ctaImage}
            alt="Call to action"
            className="w-full h-[120%] absolute -top-[10%] left-0 object-cover opacity-40 parallax-bg"
          />
        </div>
        
        <div className="relative z-10 max-w-[1600px] mx-auto w-full flex flex-col items-center gap-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {['Kitchens', 'Bathrooms', 'Cabinetry', 'Tables', 'Seating', 'Closets', 'Doors', 'Millwork', 'CNC', 'Commercial'].map(s => {
              const isActive = s.toLowerCase() === slug;
              return (
                <Link 
                  key={s} 
                  to={`/services/${s.toLowerCase()}`}
                  className={`border border-white/30 px-6 py-2 rounded-sm text-sm uppercase tracking-widest font-bold transition-colors text-center ${isActive ? 'bg-white text-brand-dark' : 'text-white hover:bg-white/10'}`}
                >
                  {s}
                </Link>
              );
            })}
          </div>
          
          <div className="text-center w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border-t border-b border-white/20 py-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white tracking-tight uppercase text-left max-w-lg">
              Enquire now for a free quote
            </h2>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-4 border border-white text-white px-8 py-4 font-bold uppercase tracking-wider btn-fill-white transition-colors rounded-sm text-sm shrink-0"
            >
              Enquire Now <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
