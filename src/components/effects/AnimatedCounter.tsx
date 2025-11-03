import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export function AnimatedCounter({
  end,
  start = 0,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const counterRef = useRef({ value: start });
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      gsap.to(counterRef.current, {
        value: end,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          setCount(counterRef.current.value);
        },
      });
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}
