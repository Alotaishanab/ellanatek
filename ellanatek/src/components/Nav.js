import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaBullhorn, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
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
        
        {/* Account Button - styled to match your nav design */}
        <div className="nav-account-button">
          <AccountButton variant="nav" />
        </div>
      </div>

      <style jsx>{`
        .nav-account-button {
          margin-left: 20px;
          display: flex;
          align-items: center;
        }

        .nav-account-button button {
          background: none !important;
          border: 1px solid #007bff !important;
          color: #007bff !important;
          padding: 8px 16px !important;
          border-radius: 20px !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          font-size: 12px !important;
          font-weight: 500 !important;
          transition: all 0.3s ease !important;
          text-transform: uppercase !important;
          letter-spacing: 0.5px !important;
        }

        .nav-account-button button:hover {
          background: #007bff !important;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
        }

        @media (max-width: 768px) {
          .nav-account-button {
            margin-left: 10px;
          }
          
          .nav-account-button button {
            padding: 6px 12px !important;
            font-size: 10px !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Nav;