import { useEffect, useRef } from 'react';
import { useAnimation, useInView } from 'framer-motion';

export function useScrollReveal(delay = 0) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return {
    ref,
    initial: "hidden",
    animate: controls,
    variants: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
          duration: 0.8, 
          delay,
          ease: [0.16, 1, 0.3, 1]
        } 
      }
    }
  };
}
