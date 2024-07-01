import React, { useRef } from 'react';
import HomeSnapshot from '../snapshots/HomeSnapshot';
import AdvertiseSnapshot from '../snapshots/AdvertiseSnapshot';
import AboutSnapshot from '../snapshots/AboutSnapshot';
import '../styles/Nav.css';

const Nav = ({ navOpen, onNavClick }) => {
  const navLinksRef = useRef(null);

  const handleNavClick = (index) => {
    onNavClick(index);
    if (navLinksRef.current) {
      const navLinks = Array.from(navLinksRef.current.children);
      const selectedLink = navLinks[index];
      if (selectedLink) { // Check if selectedLink is defined
        selectedLink.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      } else {
        console.error("Selected link is undefined at index: ", index);
      }
    }
  };

  return (
    <nav className={navOpen ? 'nav-open' : ''}>
      <div id="nav-links" ref={navLinksRef}>
        <div className="nav-link" onClick={() => handleNavClick(0)}>
          <h2 className="nav-link-label rubik-font">Home</h2>
          <HomeSnapshot />
        </div>
        <div className="nav-link" onClick={() => handleNavClick(1)}>
          <h2 className="nav-link-label rubik-font">Advertise</h2>
          <AdvertiseSnapshot />
        </div>
        <div className="nav-link" onClick={() => handleNavClick(2)}>
          <h2 className="nav-link-label rubik-font">About</h2>
          <AboutSnapshot />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
