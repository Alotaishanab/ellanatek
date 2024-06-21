import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import ToggleButton from './components/ToggleButton';
import Home from './components/Home';
import AdvertiseWithUs from './components/AdvertiseWithUs';
import RideWithUs from './components/RideWithUs';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';

const App = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : 'auto';
    document.body.setAttribute('data-nav', navOpen); // Set data-nav attribute based on navOpen state
  }, [navOpen]);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const screens = [
    <Home key="home" />,
    <AdvertiseWithUs key="advertise-with-us" />,
    <RideWithUs key="ride-with-us" />,
    <AboutUs key="about-us" />,
  ];

  const handleNavClick = (index) => {
    setCurrentScreen(index);
    setNavOpen(false);
  };

  return (
    <div className={`App ${navOpen ? 'nav-open' : ''}`}>
      <ToggleButton toggleNav={toggleNav} navOpen={navOpen} />
      <div className={`screen-container ${navOpen ? 'screen-container-open' : ''}`}>
        {screens[currentScreen]}
      </div>
      <Nav navOpen={navOpen} onNavClick={handleNavClick} />
      <Footer />
    </div>
  );
};

export default App;
