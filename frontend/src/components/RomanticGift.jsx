import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FloatingPhotos from './FloatingPhotos';

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.95), rgba(255, 133, 133, 0.95));
  font-family: 'Arial', sans-serif;
  overflow: hidden;
  position: relative;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 90vh;
  }

  @media (max-width: 480px) {
    height: 100vh;
  }
`;

const Button = styled.button`
  padding: ${props => props.isMobile ? '12px 24px' : '15px 30px'};
  font-size: ${props => props.isMobile ? '1rem' : '1.2rem'};
  background-color: #fff;
  border: 2px solid #ff4d4d;
  border-radius: 25px;
  color: #ff4d4d;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 100;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: scale(1.05);
    background-color: #ff4d4d;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.9rem;
    border-width: 1.5px;
  }
`;

const Letter = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 1.5rem;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in;
  position: relative;
  margin: 20px;
  box-sizing: border-box;
  z-index: 100;
  backdrop-filter: blur(5px);

  &::before {
    content: '❤';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 2rem;
    color: #ff4d4d;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    font-size: 0.9rem;
    width: 95%;
    margin: 15px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    font-size: 0.85rem;
    width: 98%;
    margin: 10px;
    border-radius: 15px;

    &::before {
      font-size: 1.5rem;
      top: -15px;
    }
  }
`;

const Heart = styled.div`
  position: absolute;
  font-size: ${props => props.isMobile ? '1rem' : '1.5rem'};
  color: #ff4d4d;
  animation: float 3s ease-in-out infinite;
  opacity: 0.6;
  pointer-events: none;

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const RomanticGift = () => {
  const [buttonPosition, setButtonPosition] = useState({ x: 50, y: 50 });
  const [clicks, setClicks] = useState(0);
  const [showLetter, setShowLetter] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Create floating hearts
    const newHearts = Array.from({ length: isMobile ? 10 : 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setHearts(newHearts);

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const moveButton = () => {
    if (clicks >= 5) {
      setShowLetter(true);
      return;
    }

    const maxWidth = window.innerWidth - (isMobile ? 150 : 200);
    const maxHeight = window.innerHeight - (isMobile ? 80 : 100);
    
    // Ensure button stays within visible bounds
    const newX = Math.max(20, Math.min(Math.random() * maxWidth, maxWidth - 20));
    const newY = Math.max(20, Math.min(Math.random() * maxHeight, maxHeight - 20));
    
    setButtonPosition({ x: newX, y: newY });
    setClicks(prev => prev + 1);
  };

  return (
    <Container>
      <ContentWrapper>
        <FloatingPhotos isMobile={isMobile} />
        {hearts.map(heart => (
          <Heart
            key={heart.id}
            isMobile={isMobile}
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              animationDelay: `${heart.delay}s`
            }}
          >
            ❤
          </Heart>
        ))}
        
        {!showLetter ? (
          <Button
            isMobile={isMobile}
            style={{
              left: buttonPosition.x,
              top: buttonPosition.y,
              transition: clicks === 0 ? 'none' : 'all 0.5s ease'
            }}
            onClick={moveButton}
          >
            Click Me! ❤
          </Button>
        ) : (
          <Letter>
            <h2 style={{ 
              color: '#ff4d4d', 
              marginBottom: '1rem',
              fontSize: isMobile ? '1.3rem' : '1.8rem',
              '@media (max-width: 480px)': {
                fontSize: '1.2rem',
                marginBottom: '0.8rem'
              }
            }}>
              My Dearest
            </h2>
            <p style={{ 
              lineHeight: '1.6', 
              color: '#333',
              fontSize: isMobile ? '0.95rem' : '1.1rem',
              padding: isMobile ? '0 10px' : '0 20px',
              '@media (max-width: 480px)': {
                fontSize: '0.9rem',
                lineHeight: '1.5',
                padding: '0 8px'
              }
            }}>
              Hapyy 14th Baby ko, gusto ko lang sabihin sayo ay Love na Love kita sorry sa mga nagawa ko nung nakaraaang buwan,
              wait lang tayo baby mag sasama rin tayo araw araw and gada pag gising HAHAHAH, You're not just my girlfriend,
              you're my best friend, my confidante, and my soulmate ❤ I Love you always and I Love you forever ❤
            </p>
            <p style={{ 
              marginTop: isMobile ? '0.8rem' : '1rem', 
              fontStyle: 'italic', 
              color: '#ff4d4d',
              fontSize: isMobile ? '0.9rem' : '1rem',
              '@media (max-width: 480px)': {
                fontSize: '0.85rem',
                marginTop: '0.6rem'
              }
            }}>
              Forever Yours
            </p>
          </Letter>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default RomanticGift;
