import React, { useState, useEffect } from 'react';
import '../styles/ToggleButton.css';
import threeSidesIcon from '../assets/3.webp';
import xIcon from '../assets/X.png';

const ToggleButton = ({ toggleNav, navOpen }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setIsVisible(true); // Show the button on scroll
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(false); // Hide the button after 2 seconds of no scroll activity
      }, 2000); // Adjust the timeout value as needed
    };

    const showButton = () => {
      setIsVisible(true); // Show the button immediately when scrolling starts
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsVisible(false); // Hide the button after 2 seconds of no scroll activity
      }, 2000); // Adjust the timeout value as needed
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', showButton); // Listen for mouse movement as a proxy for touch or other user interaction

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', showButton);
      clearTimeout(scrollTimeout); // Cleanup on component unmount
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
