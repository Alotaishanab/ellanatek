// ellanatek/src/components/Nav.js
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import HomeSnapshot from '../snapshots/HomeSnapshot';
import AdvertiseSnapshot from '../snapshots/AdvertiseSnapshot';
import AboutSnapshot from '../snapshots/AboutSnapshot';
import ToggleButton from './ToggleButton'; // Import the ToggleButton component
import '../styles/Nav.css';

const Nav = ({ navOpen, onNavClick }) => {
  const { t, i18n } = useTranslation();
  const navLinksRef = useRef(null);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setShowButton(true); // Show the button on scroll
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setShowButton(false); // Hide the button after 2 seconds of no scroll activity
      }, 2000); // Adjust the timeout value as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout); // Cleanup on component unmount
    };
  }, []);

  const handleNavClick = (index) => {
    onNavClick(index);
    if (navLinksRef.current) {
      const navLinks = Array.from(navLinksRef.current.children);
      const selectedLink = navLinks[index];
      if (selectedLink) {
        selectedLink.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      } else {
        console.error("Selected link is undefined at index: ", index);
      }
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <nav className={`nav ${navOpen ? 'nav-open' : ''}`}>
      <div id="nav-links" ref={navLinksRef}>
        <div className="nav-link" onClick={() => handleNavClick(0)}>
          <h2 className="nav-link-label rubik-font">{t('nav.home')}</h2>
          <HomeSnapshot />
        </div>
        <div className="nav-link" onClick={() => handleNavClick(1)}>
          <h2 className="nav-link-label rubik-font">{t('nav.advertise')}</h2>
          <AdvertiseSnapshot />
        </div>
        <div className="nav-link" onClick={() => handleNavClick(2)}>
          <h2 className="nav-link-label rubik-font">{t('nav.about')}</h2>
          <AboutSnapshot />
        </div>
      </div>
      <div className="language-switcher">
        <button onClick={() => changeLanguage('en')} className={`lang-button ${i18n.language === 'en' ? 'active' : ''}`}>
          English
        </button>
        <button onClick={() => changeLanguage('ar')} className={`lang-button ${i18n.language === 'ar' ? 'active' : ''}`}>
          العربية
        </button>
      </div>
      <ToggleButton toggleNav={() => {}} navOpen={navOpen} showButton={showButton} /> {/* Pass showButton state */}
    </nav>
  );
};

export default Nav;
