// src/components/AccountButton.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignInAlt } from 'react-icons/fa';
import ellantekAPI from '../services/api';

const AccountButton = ({ variant = 'default' }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const isAuth = ellantekAPI.isAuthenticated();
      setIsLoggedIn(isAuth);
      
      if (isAuth) {
        const userData = localStorage.getItem('ellanatek_user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
    };

    checkAuth();

    // Listen for auth changes (optional - you can trigger this from login/logout)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate('/advertise-with-us/account');
    } else {
      navigate('/advertise-with-us/login');
    }
  };

  // Different button styles based on variant
  const getButtonStyle = () => {
    switch (variant) {
      case 'nav':
        return {
          background: 'none',
          border: '1px solid #007bff',
          color: '#007bff',
          padding: '8px 16px',
          borderRadius: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          transition: 'all 0.2s',
        };
      case 'hero':
        return {
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'all 0.2s',
        };
      case 'footer':
        return {
          background: 'rgba(255,255,255,0.1)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.3)',
          padding: '8px 16px',
          borderRadius: '5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          transition: 'all 0.2s',
        };
      default:
        return {
          background: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '14px',
          transition: 'all 0.2s',
        };
    }
  };

  const buttonStyle = getButtonStyle();

  return (
    <button 
      onClick={handleClick}
      style={buttonStyle}
      onMouseEnter={(e) => {
        if (variant === 'nav') {
          e.target.style.background = '#007bff';
          e.target.style.color = 'white';
        } else if (variant === 'hero') {
          e.target.style.background = '#0056b3';
        } else if (variant === 'footer') {
          e.target.style.background = 'rgba(255,255,255,0.2)';
        } else {
          e.target.style.background = '#218838';
        }
      }}
      onMouseLeave={(e) => {
        Object.assign(e.target.style, buttonStyle);
      }}
    >
      {isLoggedIn ? (
        <>
          <FaUser />
          {user ? `Hello, ${user.firstName || 'User'}` : 'My Account'}
        </>
      ) : (
        <>
          <FaSignInAlt />
          Sign In
        </>
      )}
    </button>
  );
};

export default AccountButton;