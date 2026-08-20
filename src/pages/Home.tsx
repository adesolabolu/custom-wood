import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { Hero } from '../components/Hero';
import { WhoWeAre } from '../components/WhoWeAre';
import { Services } from '../components/Services';
import { Testimonials } from '../components/Testimonials';
import { Portfolio } from '../components/Portfolio';
import { CTA } from '../components/CTA';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;
    const ctx = gsap.context(() => {
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
    }, mainRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="flex-grow">
      <Hero />
      <WhoWeAre />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTA />
    </main>
  );
}
