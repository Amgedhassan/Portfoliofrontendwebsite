import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

interface TextRevealProps {
  children: string;
  delay?: number;
  variant?: 'fade' | 'slide' | 'wave' | 'glitch';
  className?: string;
}

export function TextReveal({ 
  children, 
  delay = 0, 
  variant = 'fade',
  className = '' 
}: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const split = new SplitType(textRef.current, { 
      types: 'chars,words',
      tagName: 'span'
    });

    const animations = {
      fade: () => {
        gsap.from(split.chars, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.03,
          delay,
          ease: 'power3.out',
        });
      },
      slide: () => {
        gsap.from(split.chars, {
          x: -50,
          opacity: 0,
          duration: 0.6,
          stagger: 0.02,
          delay,
          ease: 'back.out(1.4)',
        });
      },
      wave: () => {
        gsap.from(split.chars, {
          y: -100,
          opacity: 0,
          duration: 0.8,
          stagger: {
            each: 0.03,
            from: 'center',
          },
          delay,
          ease: 'elastic.out(1, 0.5)',
        });
      },
      glitch: () => {
        gsap.from(split.chars, {
          opacity: 0,
          x: () => gsap.utils.random(-50, 50),
          y: () => gsap.utils.random(-50, 50),
          rotation: () => gsap.utils.random(-15, 15),
          duration: 0.5,
          stagger: 0.02,
          delay,
          ease: 'power2.out',
        });
      },
    };

    animations[variant]();

    return () => {
      split.revert();
    };
  }, [delay, variant]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}
