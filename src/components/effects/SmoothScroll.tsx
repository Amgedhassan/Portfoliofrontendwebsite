import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
  speed?: number;
  enabled?: boolean;
}

export function SmoothScroll({ children, speed = 1, enabled = true }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current || !contentRef.current) return;

    const container = containerRef.current;
    const content = contentRef.current;

    // Set up smooth scroll
    let scrollTween: gsap.core.Tween;

    const updateScroll = () => {
      if (scrollTween) scrollTween.kill();
      
      scrollTween = gsap.to(content, {
        y: () => -(content.scrollHeight - container.clientHeight),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${content.scrollHeight - container.clientHeight}`,
          scrub: speed,
          invalidateOnRefresh: true,
        },
      });
    };

    updateScroll();

    // Update on resize
    window.addEventListener('resize', updateScroll);

    return () => {
      window.removeEventListener('resize', updateScroll);
      if (scrollTween) scrollTween.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [enabled, speed]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden">
      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
