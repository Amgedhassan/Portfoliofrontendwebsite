import { useRef } from 'react';
import { useSpring, animated } from 'react-spring';

interface MagneticHoverProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticHover({ children, strength = 0.3, className = '' }: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 350, friction: 40 },
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    api.start({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    api.start({ x: 0, y: 0 });
  };

  return (
    <animated.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: x.to((x) => `translate3d(${x}px, ${y.get()}px, 0)`),
      }}
    >
      {children}
    </animated.div>
  );
}
