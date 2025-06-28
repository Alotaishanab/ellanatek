import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaBullhorn, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Nav.css';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, hasCompletedOnboarding, isLoading } = useAuth();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/advertise-with-us' && location.pathname.startsWith('/advertise-with-us')) return true;
    if (path === '/about-us' && location.pathname === '/about-us') return true;
    if (path === '/contact' && location.pathname === '/contact') return true;
    return false;
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  const handleAdvertiseClick = () => {
    if (isLoading) {
      // Wait for auth check to complete
      return;
    }

    if (isAuthenticated) {
      if (hasCompletedOnboarding()) {
        // User is logged in and has completed onboarding, go to dashboard
        navigate('/advertise-with-us/dashboard');
      } else {
        // User is logged in but hasn't completed onboarding, go to questionnaire
        navigate('/advertise-with-us/questions');
      }
    } else {
      // User is not logged in, go to onboarding page
      navigate('/advertise-with-us');
    }
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
          className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          onClick={() => handleNavClick('/contact')}
        >
          <FaEnvelope className="nav-icon" />
          <h2 className="nav-link-label rubik-font">CONTACT</h2>
        </div>
        <div 
          className={`nav-link ${isActive('/advertise-with-us') ? 'active' : ''}`}
          onClick={handleAdvertiseClick}
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