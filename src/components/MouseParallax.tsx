import React, { useEffect, useRef, FC } from 'react';
import gsap from 'gsap';

interface Layer {
  parallaxFactor: number;
  content: React.ReactNode;
}

interface Props {
  layers: Layer[];
}

const MouseParallax: FC<Props> = ({ layers }) => {
  const objectRefs = useRef<(HTMLDivElement | null)[]>([]); // Create refs for each layer

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      layers.forEach((layer, index) => {
        const moveX = (innerWidth / 2 - e.clientX) * layer.parallaxFactor;
        const moveY = (innerHeight / 2 - e.clientY) * layer.parallaxFactor;

        gsap.to(objectRefs.current[index], {
          x: moveX * 0.25,
          y: moveY * 0.25,
          ease: 'power3.out',
          duration: 0.5,
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [layers]); // Add layers to the dependency array

  return (
    <div style={{ position: 'relative' }}>
      {layers.map((layer, index) => (
        <div
          key={index}
          ref={(el) => (objectRefs.current[index] = el)}
          style={{ position: 'absolute' }}
        >
          {layer.content}
        </div>
      ))}
    </div>
  );
};

export default MouseParallax;
