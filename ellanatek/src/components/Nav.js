import React, { useRef } from 'react';
import '../styles/Nav.css';

const Nav = ({ navOpen, onNavClick }) => {
  const navLinksRef = useRef(null);

  const handleNavClick = (index) => {
    onNavClick(index);
    if (navLinksRef.current) {
      const navLinks = Array.from(navLinksRef.current.children);
      const selectedLink = navLinks[index];
      selectedLink.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  return (
    <nav className={navOpen ? 'nav-open' : ''}>
      <div id="nav-links" ref={navLinksRef}>
        <div className="nav-link" onClick={() => handleNavClick(0)}>
          <h2 className="nav-link-label rubik-font">Home</h2>
          <img className="nav-link-image" src="https://images.unsplash.com/photo-1666091863721-54331a5db52d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" alt="Home" />
        </div>
        <div className="nav-link" onClick={() => handleNavClick(1)}>
          <h2 className="nav-link-label rubik-font">Advertise With Us</h2>
          <img className="nav-link-image" src="https://images.unsplash.com/photo-1666055642230-1595470b98fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=995&q=80" alt="Advertise With Us" />
        </div>
        <div className="nav-link" onClick={() => handleNavClick(2)}>
          <h2 className="nav-link-label rubik-font">Ride With Us</h2>
          <img className="nav-link-image" src="https://images.unsplash.com/photo-1666005487638-61f45819c975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" alt="Ride With Us" />
        </div>
        <div className="nav-link" onClick={() => handleNavClick(3)}>
          <h2 className="nav-link-label rubik-font">About Us</h2>
          <img className="nav-link-image" src="https://images.unsplash.com/photo-1665910407771-bc84ad45676b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80" alt="About Us" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
