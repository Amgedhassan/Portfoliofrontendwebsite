import Tilt from 'react-parallax-tilt';

interface ParallaxTiltProps {
  children: React.ReactNode;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  scale?: number;
  transitionSpeed?: number;
  glareEnable?: boolean;
  glareMaxOpacity?: number;
  className?: string;
}

export function ParallaxTilt({
  children,
  tiltMaxAngleX = 15,
  tiltMaxAngleY = 15,
  scale = 1.05,
  transitionSpeed = 1000,
  glareEnable = true,
  glareMaxOpacity = 0.3,
  className = '',
}: ParallaxTiltProps) {
  return (
    <Tilt
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      scale={scale}
      transitionSpeed={transitionSpeed}
      glareEnable={glareEnable}
      glareMaxOpacity={glareMaxOpacity}
      glareColor="#00fff2"
      glarePosition="all"
      className={className}
    >
      {children}
    </Tilt>
  );
}
