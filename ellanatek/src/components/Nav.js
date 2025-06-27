import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaBullhorn, FaInfoCircle } from 'react-icons/fa';
import '../styles/Nav.css';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/advertise-with-us' && location.pathname.startsWith('/advertise-with-us')) return true;
    if (path === '/about-us' && location.pathname === '/about-us') return true;
    return false;
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="nav">
      <div id="nav-links">
        <div 
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
          onClick={() => handleNavClick('/')}
        >
          <FaHome className="nav-icon" />
          <h2 className="nav-link-label rubik-font">HOME</h2>
        </div>
        <div 
          className={`nav-link ${isActive('/advertise-with-us') ? 'active' : ''}`}
          onClick={() => handleNavClick('/advertise-with-us/login')}
        >
          <FaBullhorn className="nav-icon" />
          <h2 className="nav-link-label rubik-font">ADVERTISE</h2>
        </div>
        <div 
          className={`nav-link ${isActive('/about-us') ? 'active' : ''}`}
          onClick={() => handleNavClick('/about-us')}
        >
          <FaInfoCircle className="nav-icon" />
          <h2 className="nav-link-label rubik-font">ABOUT</h2>
        </div>
      </div>
    </nav>
  );
};

export default Nav; 