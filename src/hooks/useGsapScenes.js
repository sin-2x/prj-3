import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapScenes() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const contexts = gsap.context(() => {
      gsap.utils.toArray('[data-cinema-section]').forEach((section) => {
        const haze = section.querySelector('[data-haze]');
        const depth = section.querySelectorAll('[data-depth]');
        const text = section.querySelectorAll('[data-reveal-line]');

        if (haze) {
          gsap.fromTo(
            haze,
            { opacity: 0.15, scale: 0.95 },
            {
              opacity: 0.82,
              scale: 1.08,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            },
          );
        }

        if (depth.length) {
          gsap.to(depth, {
            yPercent: -14,
            scale: 1.06,
            ease: 'none',
            stagger: 0.02,
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6,
            },
          });
        }

        if (text.length) {
          gsap.fromTo(
            text,
            { autoAlpha: 0, y: 42, filter: 'blur(10px)' },
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1.4,
              stagger: 0.24,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 68%',
                end: 'center 35%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }
      });

      gsap.to('[data-road]', {
        scale: 1.16,
        yPercent: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: '#road',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.3,
        },
      });
    });

    return () => {
      contexts.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
