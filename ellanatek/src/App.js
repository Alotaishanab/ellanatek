// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './components/Nav';
import ToggleButton from './components/ToggleButton';
import Home from './components/Home';
import AdvertiseWithUs from './components/AdvertiseWithUs';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin'; // Import AdminLogin component
import AdminDashboard from './components/AdminDashboard'; // Import AdminDashboard component
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

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

  const handleNavClick = (index) => {
    setCurrentScreen(index);
    setNavOpen(false);
  };

  const screens = [
    <Home key="home" onNavigate={handleNavClick} />,
    <AdvertiseWithUs key="advertise-with-us" onNavigate={handleNavClick} />,
    <AboutUs key="about-us" />,
  ];

  return (
    <Router>
      <div className={`App ${navOpen ? 'nav-open' : ''}`} style={{ overflowX: 'hidden' }}>
        <ToggleButton toggleNav={toggleNav} navOpen={navOpen} />
        <Nav navOpen={navOpen} onNavClick={handleNavClick} />

        <Routes>
          {/* Existing Screens */}
          <Route path="/" element={<div className={`screen-container ${navOpen ? 'screen-container-open' : ''}`} style={{ maxWidth: '100vw', overflowX: 'hidden' }}>{screens[currentScreen]}</div>} />
          <Route path="/advertise-with-us" element={<div className={`screen-container ${navOpen ? 'screen-container-open' : ''}`} style={{ maxWidth: '100vw', overflowX: 'hidden' }}>{screens[1]}</div>} />
          <Route path="/about-us" element={<div className={`screen-container ${navOpen ? 'screen-container-open' : ''}`} style={{ maxWidth: '100vw', overflowX: 'hidden' }}>{screens[2]}</div>} />

          {/* New Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Redirect Unknown Routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
