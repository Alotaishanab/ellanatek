import React, { useState, useEffect } from 'react';
import '../styles/ToggleButton.css';
import threeSidesIcon from '../assets/3.webp';
import xIcon from '../assets/X.png';

const ToggleButton = ({ toggleNav, navOpen }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setIsVisible(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    const handleTouchStart = () => {
      setIsVisible(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    const handleTouchMove = () => {
      setIsVisible(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    const handleMouseMove = () => {
      setIsVisible(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <button
      id="nav-toggle"
      type="button"
      className={`nav-toggle ${isVisible ? 'show' : 'hide'}`}
      onClick={toggleNav}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      <span className={`icon open ${navOpen ? 'hidden' : ''}`}>
        <img src={threeSidesIcon} alt="Menu Bars" style={{ width: '70%', height: 'auto' }} />
      </span>
      <span className={`icon close ${navOpen ? '' : 'hidden'}`}>
        <img src={xIcon} alt="Close Icon" style={{ width: '70%', height: 'auto' }} />
      </span>
    </button>
  );
};

export default ToggleButton;
