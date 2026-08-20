import React, { useRef, useMemo, useEffect } from 'react';
import { ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAdmin } from '../context/AdminContext';
import { galleryImages as defaultGalleryImages } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const { galleries } = useAdmin();
  
  // Use admin state galleries if available, fallback to default (take top 5 items instead of 6)
  const displayImages = useMemo(() => {
    const source = galleries && galleries.length > 0 ? galleries : defaultGalleryImages;
    return source.slice(0, 5);
  }, [galleries]);

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    // Timeout to ensure DOM and images have rendered dimensions
    const timer = setTimeout(() => {
      if (!sectionRef.current || !containerRef.current) return;
      ctx = gsap.context(() => {
        if (!sectionRef.current || !containerRef.current) return;

        const getScrollAmount = () => {
          const totalWidth = containerRef.current?.scrollWidth || 0;
          const viewportWidth = window.innerWidth;
          return -(totalWidth - viewportWidth + 64);
        };

        const scrollAmount = getScrollAmount();

        const tween = gsap.to(containerRef.current, {
          x: scrollAmount,
          ease: "none"
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${Math.abs(scrollAmount) + window.innerHeight}`, // Scroll the distance plus 1 viewport height to pause
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              // The progress bar will fill up over the entire pinned duration (including the pause)
              // This is a simple and clean way to show the progress.
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
          }
        });
      }, sectionRef.current);
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, [displayImages]);

  return (
    <div className="relative">
      <section 
        ref={sectionRef} 
        className="relative w-full h-screen bg-brand-light overflow-hidden flex flex-col justify-center select-none"
      >
        {/* Horizontal Motion Track */}
        <div 
          ref={containerRef} 
          className="flex items-center gap-6 md:gap-8 px-8 md:px-16 w-max pt-4 will-change-transform"
        >
          
          {/* 1. Intro Panel */}
          <div className="w-[85vw] sm:w-[320px] md:w-[380px] shrink-0 flex flex-col justify-center pr-4 md:pr-8">
            <p className="uppercase tracking-widest text-xs md:text-sm font-bold flex items-center gap-1.5 before:content-['['] after:content-[']'] mb-6 text-brand-dark">
              Portfolio
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-medium mb-6 text-brand-dark tracking-wide uppercase leading-none">
              OUR WORK
            </h2>
            <p className="text-brand-dark/80 leading-relaxed mb-8 text-sm md:text-base">
              Structural integrity meets architectural beauty in our custom woodworking projects. From bespoke kitchens to signature furniture pieces, each creation is handcrafted with exacting precision.
            </p>
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-brand-brown">
              <Sparkles size={16} /> Scroll to view showcase
            </div>
          </div>

          {/* 2. Image Showcase Cards with Overlay */}
          {displayImages.map((img, idx) => (
            <div 
              key={idx} 
              className="w-[70vw] sm:w-[360px] md:w-[420px] lg:w-[480px] h-[48vh] md:h-[55vh] shrink-0 rounded-2xl md:rounded-3xl overflow-hidden relative group shadow-xl bg-brand-dark"
              data-umami-event="custom-wood-multi-main - portfolio-view"
            >
              <img 
                src={img.src} 
                alt={img.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              
              {/* Overlay displaying Title and Category */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex flex-col justify-end p-5 md:p-8 transition-opacity duration-300">
                <span className="text-brand-gold text-[10px] md:text-xs uppercase font-bold tracking-widest mb-1 md:mb-2 drop-shadow-sm">
                  {img.category || "Woodworking"}
                </span>
                <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-heading font-medium tracking-wide leading-snug drop-shadow-md">
                  {img.title}
                </h3>
                <div className="h-0.5 w-10 md:w-12 bg-brand-gold/80 mt-3 md:mt-4 transition-all duration-300 group-hover:w-16 md:group-hover:w-20" />
              </div>
            </div>
          ))}

          {/* 3. Outro CTA Card (View All Work) */}
          <div className="w-[85vw] sm:w-[340px] md:w-[390px] h-[48vh] md:h-[55vh] shrink-0 rounded-2xl md:rounded-3xl bg-brand-dark text-brand-light p-6 md:p-10 flex flex-col justify-between shadow-2xl mr-8 md:mr-16">
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-medium mb-4 md:mb-6 leading-tight text-white">
                View All Our Work
              </h3>
              <p className="text-white/75 text-xs md:text-sm leading-relaxed">
                Discover our complete portfolio of bespoke architectural cabinetry, custom dining tables, vanities, and interior renovations.
              </p>
            </div>

            <div>
              <Link 
                to="/portfolio" 
                className="w-full uppercase text-[10px] md:text-xs font-semibold tracking-wider bg-brand-gold text-brand-dark py-3 px-5 rounded-md transition-all duration-300 hover:bg-white flex items-center justify-center gap-2 font-body shadow-lg group"
              >
                <span>Explore Full Portfolio</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="absolute bottom-6 left-8 md:left-16 right-8 md:right-16 z-20 flex items-center gap-4">
          <div className="flex-1 h-1 bg-brand-dark/10 rounded-full overflow-hidden">
            <div 
              ref={progressBarRef}
              className="h-full bg-brand-gold origin-left w-full rounded-full transition-transform ease-out" 
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <Link 
            to="/portfolio" 
            className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-brand-dark hover:text-brand-brown transition-colors shrink-0 flex items-center gap-1"
          >
            All Work <ChevronRight size={14} />
          </Link>
        </div>

      </section>
    </div>
  );
}
