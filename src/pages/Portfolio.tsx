import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useAdmin } from "../context/AdminContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const MagneticGalleryItem: React.FC<{ img: any, index?: number }> = ({ img, index = 1 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const anim = gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      anim.kill();
      anim.scrollTrigger?.kill();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !imgRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.15;
    const y = (e.clientY - top - height / 2) * 0.15;

    gsap.to(imgRef.current, {
      x,
      y,
      scale: 1.1,
      duration: 1,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    gsap.to(imgRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out",
    });
  };

  const isFirst = index === 0;

  return (
    <motion.div
      layout
      exit={{ opacity: 0, scale: 0.8 }}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group rounded-xl overflow-hidden bg-gray-100 break-inside-avoid mb-4 md:mb-6 lg:mb-8 ${isFirst ? 'aspect-[3/4] lg:aspect-[2/3]' : ''}`}
      data-umami-event="custom-wood-multi-main - portfolio-view"
    >
      <img
        ref={imgRef}
        src={img.src}
        alt={img.title}
        referrerPolicy="no-referrer"
        className={`w-full relative object-cover block scale-110 origin-center ${isFirst ? 'h-full absolute inset-0' : 'h-auto'}`}
      />
      {/* Caption Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10 pointer-events-none">
        <p className="text-brand-gold text-xs font-bold tracking-widest uppercase mb-2">
          {img.category}
        </p>
        <h4 className="text-brand-light text-xl font-heading font-medium">
          {img.title}
        </h4>
      </div>
    </motion.div>
  );
};

export function PortfolioPage() {
  const { galleries } = useAdmin();
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".parallax-container").forEach((container: any) => {
        const img = container.querySelector(".parallax-img");
        if (img) {
          gsap.to(img, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });

      gsap.utils.toArray(".parallax-bg").forEach((bg: any) => {
        gsap.to(bg, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: bg.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, [activeCategory]);

  const dynamicCategories = ["All", ...Array.from(new Set(galleries.map(g => g.category)))];

  const filteredGallery =
    activeCategory === "All"
      ? galleries
      : galleries.filter((img) => img.category === activeCategory);

  return (
    <div className="pt-24 lg:pt-32 bg-brand-light min-h-screen" ref={containerRef}>
      {/* 1. Portfolio Intro / Hero Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 lg:py-24 max-w-[1600px] mx-auto text-center relative">
        <div className="text-left mb-12">
          <Breadcrumbs />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <p className="uppercase tracking-widest text-sm font-bold mb-6 flex items-center justify-center gap-1 before:content-['['] after:content-[']']">
            Woodworking, Joinery & Carpentry Projects
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-medium leading-tight text-brand-dark mb-8">
            RECENT SHOP BUILDS
          </h1>
          <p className="text-brand-dark/80 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
            Browse some of our favorite recent shop builds and gallery items.
          </p>
        </motion.div>
      </section>

      {/* 2. Recent Shop Builds / Gallery Section */}
      {galleries.length > 0 && (
        <section className="bg-brand-light py-12 lg:py-24">
          <div className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
            <div className="text-center mb-16">
              {/* Filters */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {dynamicCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors border ${
                      activeCategory === category
                        ? "bg-brand-dark border-brand-dark text-brand-light"
                        : "bg-white border-transparent text-brand-dark hover:border-brand-dark/20"
                    }`}
                    data-umami-event="custom-wood-multi-main - portfolio-view"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Column Masonry/Grid */}
            <motion.div
              layout
              className="columns-2 lg:columns-3 gap-4 md:gap-6 lg:gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredGallery.map((img, idx) => (
                  <MagneticGalleryItem key={img.id} img={img} index={idx} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      )}

      {/* 3. Action Call-To-Target Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/drzh5dzha/image/upload/v1782491729/woodwork_template/669e2bfdc58ba40ac89d5524_pexels-heyho-8143944%20%281%29.webp"
            alt="CTA Background"
            className="w-full h-full object-cover parallax-bg"
          />
          <div className="absolute inset-0 bg-brand-dark/60" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-medium text-brand-light mb-8">
            START YOUR CUSTOM PROJECT
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 bg-brand-gold text-brand-dark px-10 py-5 font-bold uppercase tracking-wider btn-fill-white transition-colors rounded-sm text-sm"
            >
              Enquire Now <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
