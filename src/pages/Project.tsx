import { useEffect, useState, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { projects } from "../data/portfolio";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { Breadcrumbs } from "../components/Breadcrumbs";
import { ProjectTimeline } from "../components/ProjectTimeline";

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Quick hack to force scroll to top on mount when route params change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // GSAP Parallax setup
  useEffect(() => {
    if (!project) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".parallax-container").forEach((container: any) => {
        const img = container.querySelector(".parallax-img");
        if (img) {
          gsap.to(img, {
            yPercent: 20,
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
    }, containerRef);

    return () => ctx.revert();
  }, [slug, project]);

  // Reading progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Get 3 related projects (excluding current)
  const relatedProjects = projects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-gold z-50 origin-left"
        style={{ scaleX }}
      />
      <div className="pt-24 lg:pt-32 bg-brand-light min-h-screen">
        <div className="px-6 md:px-12 lg:px-24 py-12 lg:py-20 max-w-[1600px] mx-auto">
          {/* Breadcrumbs */}
          <Breadcrumbs />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">
            {/* Hero Section */}
            <div className="lg:col-span-12 pt-4 pb-12 z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mb-12"
              >
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-4 border border-brand-dark/20 text-brand-dark px-6 py-3 font-bold uppercase tracking-wider btn-fill-dark transition-colors rounded-sm text-xs"
                >
                  <ChevronLeft size={16} /> Back to portfolio
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <p className="uppercase tracking-widest text-sm font-bold flex items-center gap-1 before:content-['['] after:content-[']'] text-brand-dark mb-4">
                    {project.category}
                  </p>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-medium text-brand-dark leading-tight mb-6">
                    {project.title}
                  </h1>
                  <p className="text-xl md:text-2xl font-normal text-brand-dark/80 max-w-2xl">
                    {project.shortDescription}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex gap-8 lg:justify-end"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-dark/50 mb-1">
                      Client
                    </p>
                    <p className="font-heading text-lg font-medium">
                      Private Residence
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-dark/50 mb-1">
                      Timeline
                    </p>
                    <p className="font-heading text-lg font-medium">12 Weeks</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-dark/50 mb-1">
                      Services
                    </p>
                    <p className="font-heading text-lg font-medium">
                      {project.category}
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full h-[1px] bg-brand-dark/10 mb-16 origin-left"
              />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
                <div className="md:col-span-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block w-full"
                    >
                      <Link
                        to="/quote"
                        className="inline-flex items-center justify-between bg-brand-dark text-brand-light px-8 py-5 font-bold uppercase tracking-wider btn-fill-light transition-colors rounded-sm text-sm w-full"
                      >
                        Start your project <ChevronRight size={18} />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
                <div className="md:col-span-8 space-y-6 text-brand-dark/80 text-lg leading-relaxed">
                  {project.descriptions.map((desc, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                    >
                      {desc}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>

            {/* Staggered Multi-Column Image Gallery */}
            <div className="lg:col-span-12 mt-8 lg:mt-16" ref={containerRef}>
              <div className="columns-1 md:columns-2 gap-8 space-y-8">
                {project.images.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: i % 2 === 0 ? 0 : 0.2 }}
                    className={`rounded-2xl overflow-hidden bg-brand-dark/5 cursor-zoom-in parallax-container relative break-inside-avoid ${i === 0 ? "h-[500px] md:h-[700px]" : "h-[400px] md:h-[500px]"}`}
                    onClick={() => setSelectedImage(img)}
                  >
                    <motion.img
                      src={img}
                      alt={`${project.title} - view ${i + 1}`}
                      className="w-full h-[120%] absolute -top-[10%] left-0 object-cover hover:scale-105 transition-transform duration-700 parallax-img"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[100] bg-brand-dark/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            >
              <button
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <X size={32} />
              </button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                src={selectedImage}
                alt="Fullscreen view"
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Timeline */}
        <ProjectTimeline />

        {/* Related Projects */}
        <div className="px-6 md:px-12 lg:px-24 py-16 lg:py-24 max-w-[1600px] mx-auto border-t border-brand-dark/10">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-medium text-brand-dark">
              Related Projects
            </h2>
            <Link
              to="/portfolio"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-dark hover:text-brand-brown transition-colors"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((rp, i) => (
              <Link
                key={rp.id}
                to={`/portfolio/${rp.slug}`}
                className="group block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="rounded-2xl overflow-hidden mb-6 aspect-[4/3] parallax-container relative">
                    <img
                      src={rp.coverImage}
                      alt={rp.title}
                      className="w-full h-[120%] absolute -top-[10%] left-0 object-cover group-hover:scale-105 transition-transform duration-700 parallax-img"
                    />
                  </div>
                  <p className="uppercase tracking-widest text-xs font-bold mb-3 flex items-center gap-1 before:content-['['] after:content-[']'] text-brand-dark/70">
                    {rp.category}
                  </p>
                  <h3 className="text-xl font-heading font-medium text-brand-dark group-hover:text-brand-brown transition-colors">
                    {rp.title}
                  </h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="border-t border-brand-dark/10 bg-brand-light py-16">
          <div className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-8">
            {prevProject ? (
              <Link
                to={`/portfolio/${prevProject.slug}`}
                className="group flex items-center gap-4 text-brand-dark hover:text-brand-brown transition-colors text-right"
              >
                <div className="w-12 h-12 rounded-full border border-brand-dark/20 flex items-center justify-center group-hover:bg-brand-brown group-hover:border-transparent group-hover:text-brand-light transition-all">
                  <ChevronLeft size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold opacity-60 mb-1">
                    Previous
                  </p>
                  <p className="font-heading font-medium text-lg">
                    {prevProject.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {nextProject ? (
              <Link
                to={`/portfolio/${nextProject.slug}`}
                className="group flex items-center gap-4 text-brand-dark hover:text-brand-brown transition-colors"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest font-semibold opacity-60 mb-1">
                    Next
                  </p>
                  <p className="font-heading font-medium text-lg">
                    {nextProject.title}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-brand-dark/20 flex items-center justify-center group-hover:bg-brand-brown group-hover:border-transparent group-hover:text-brand-light transition-all">
                  <ChevronRight size={20} />
                </div>
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
