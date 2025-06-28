import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaHome, FaBullhorn, FaInfoCircle } from 'react-icons/fa';
import '../styles/Nav.css';

const Nav = ({ navOpen, onNavClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavClick = (index) => {
    onNavClick(index);

    // Handle navigation based on index
    switch (index) {
      case 0: // Home
        navigate('/');
        break;
      case 1: // Advertise - goes directly to login
        navigate('/advertise-with-us/login');
        break;
      case 2: // About
        navigate('/about-us');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <nav className={`nav ${navOpen ? 'nav-open' : ''}`}>
      <div id="nav-links">
        <div className="nav-link" onClick={() => handleNavClick(0)}>
          <FaHome className="nav-icon" />
          <h2 className="nav-link-label rubik-font">HOME</h2>
        </div>
        <div className="nav-link" onClick={() => handleNavClick(1)}>
          <FaBullhorn className="nav-icon" />
          <h2 className="nav-link-label rubik-font">ADVERTISE</h2>
        </div>
        <div className="nav-link" onClick={() => handleNavClick(2)}>
          <FaInfoCircle className="nav-icon" />
          <h2 className="nav-link-label rubik-font">ABOUT</h2>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
