import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import adboxImage from '../assets/adbox.JPG';

const AdvertiseOnboarding = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/advertise-with-us/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      color: 'white',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Full-Screen Hero Section */}
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 1024 ? '1fr 1fr' : '1fr',
          gap: window.innerWidth > 1024 ? '80px' : '60px',
          alignItems: 'center',
          width: '100%'
        }}>
          
          {/* Left Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            textAlign: window.innerWidth > 1024 ? 'left' : 'center'
          }}>
            <h1 style={{
              fontSize: window.innerWidth > 1024 ? '4.5rem' : window.innerWidth > 768 ? '3rem' : '2.5rem',
              fontWeight: '700',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              margin: '0'
            }}>
              Reach Saudi Audiences with Mobile LED Ads
            </h1>
            
            <p style={{
              fontSize: window.innerWidth > 1024 ? '1.5rem' : '1.25rem',
              color: '#a0a0a0',
              lineHeight: '1.6',
              fontWeight: '400',
              maxWidth: '600px',
              margin: '0'
            }}>
              Launch your campaign in minutes with dynamic displays in high-traffic areas.
            </p>
            
            <div style={{ paddingTop: '16px' }}>
              <button 
                onClick={handleGetStarted}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(-2px) scale(1.02)';
                  e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                Start Your Campaign
                <FaArrowRight />
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div style={{
            display: 'flex',
            justifyContent: window.innerWidth > 1024 ? 'flex-end' : 'center',
            alignItems: 'center'
          }}>
            <div style={{ position: 'relative' }}>
              {/* AdBox Image */}
              <div style={{
                position: 'relative',
                transform: 'rotate(-2deg)',
                transition: 'transform 0.7s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'rotate(0deg) scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'rotate(-2deg) scale(1)'}
              >
                <img 
                  src={adboxImage}
                  alt="AdMotion LED Display Box"
                  style={{
                    width: '400px',
                    height: 'auto',
                    borderRadius: '20px',
                    boxShadow: '0 25px 60px rgba(138, 43, 226, 0.3), 0 15px 40px rgba(0, 0, 0, 0.4)',
                    border: '2px solid rgba(138, 43, 226, 0.2)',
                    transition: 'all 0.7s ease'
                  }}
                />
                
                {/* Glowing overlay effect */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(88, 28, 135, 0.1))',
                  borderRadius: '20px',
                  pointerEvents: 'none'
                }}></div>
              </div>
              
              {/* Floating Elements - Purple Theme */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                background: 'rgba(138, 43, 226, 0.3)',
                borderRadius: '50%',
                filter: 'blur(25px)',
                animation: 'pulse 4s infinite'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '120px',
                height: '120px',
                background: 'rgba(88, 28, 135, 0.2)',
                borderRadius: '50%',
                filter: 'blur(30px)',
                animation: 'pulse 4s infinite 1.5s'
              }}></div>
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '-40px',
                width: '60px',
                height: '60px',
                background: 'rgba(147, 51, 234, 0.25)',
                borderRadius: '50%',
                filter: 'blur(20px)',
                animation: 'pulse 3s infinite 0.8s'
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default AdvertiseOnboarding; 