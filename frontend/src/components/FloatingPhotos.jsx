import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const photos = [
  '/Screenshot 2025-02-15 235845.png',
  '/Screenshot 2025-02-15 235929.png',
  '/Screenshot 2025-02-16 000004.png',
  '/Screenshot 2025-02-16 000040.png',
  '/Screenshot 2025-02-16 000151.png',
  '/Screenshot 2025-02-16 000225.png',
  '/Screenshot 2025-02-16 000304.png',
  '/Screenshot 2025-02-16 000354.png',
  '/Screenshot 2025-02-16 000443.png'
];

const moveAround = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(200px, -150px) rotate(8deg) scale(1.1);
  }
  50% {
    transform: translate(-180px, 200px) rotate(-12deg) scale(0.95);
  }
  75% {
    transform: translate(-220px, -180px) rotate(15deg) scale(1.05);
  }
  100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
`;

const popIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  60% {
    transform: scale(1.2) rotate(10deg);
  }
  80% {
    transform: scale(0.9) rotate(-5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
`;

const PhotoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150vh;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 130%;
    height: 130vh;
  }

  @media (max-width: 480px) {
    width: 120%;
    height: 120vh;
  }
`;

const Photo = styled.img`
  position: absolute;
  width: ${props => props.isMobile ? '120px' : '180px'};
  height: ${props => props.isMobile ? '120px' : '180px'};
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  opacity: 0;
  filter: brightness(0.8);
  transition: filter 0.3s ease;
  animation: 
    ${popIn} 1s ease-out forwards,
    ${moveAround} ${props => 20 + props.index % 8}s ease-in-out infinite;
  animation-delay: ${props => props.index * 0.5}s;

  &:hover {
    filter: brightness(1);
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const FloatingPhotos = ({ isMobile }) => {
  const [photoPositions, setPhotoPositions] = useState([]);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const generatePositions = () => {
      return photos.map((_, index) => {
        let baseDistance;
        if (windowSize.width <= 480) {
          baseDistance = 150;
        } else if (windowSize.width <= 768) {
          baseDistance = 200;
        } else {
          baseDistance = 350;
        }

        const randomDistance = baseDistance + Math.random() * (windowSize.width <= 480 ? 100 : 200);
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * randomDistance;
        const y = Math.sin(angle) * randomDistance;
        return { x, y };
      });
    };

    setPhotoPositions(generatePositions());

    const interval = setInterval(() => {
      setPhotoPositions(generatePositions());
    }, 20000);

    return () => clearInterval(interval);
  }, [windowSize, isMobile]);

  return (
    <PhotoContainer>
      {photos.map((photo, index) => {
        const position = photoPositions[index] || { x: 0, y: 0 };
        
        return (
          <Photo
            key={photo}
            src={photo}
            index={index}
            isMobile={isMobile}
            style={{
              left: `calc(50% + ${position.x}px)`,
              top: `calc(50% + ${position.y}px)`,
            }}
            alt={`Memory ${index + 1}`}
          />
        );
      })}
    </PhotoContainer>
  );
};

export default FloatingPhotos;
