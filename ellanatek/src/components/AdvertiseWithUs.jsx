import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Login from '../services/advertise/Login';
import Signup from '../services/advertise/Signup';
import Questionnaire from '../services/advertise/Questionnaire';
import Dashboard from '../services/advertise/Dashboard';
import Payment from '../services/advertise/Payment';
import Success from '../services/advertise/Success';
import '../styles/AdvertiseWithUs.css';

const AdvertiseLanding = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="advertise-landing">
      <div className="advertise-content">
        <h1>{t('advertise.title', 'Advertise With Us')}</h1>
        <p className="subtitle">{t('advertise.subtitle', 'Take your brand to the streets')}</p>
        
        <div className="features">
          <div className="feature">
            <h3>{t('advertise.feature1.title', 'Mobile Advertising')}</h3>
            <p>{t('advertise.feature1.description', 'Get your message moving with our fleet of mobile advertising solutions')}</p>
          </div>
          <div className="feature">
            <h3>{t('advertise.feature2.title', 'Strategic Targeting')}</h3>
            <p>{t('advertise.feature2.description', 'Reach your audience where they are with precise location targeting')}</p>
          </div>
          <div className="feature">
            <h3>{t('advertise.feature3.title', 'Real-time Tracking')}</h3>
            <p>{t('advertise.feature3.description', 'Monitor your campaign performance with our advanced tracking system')}</p>
          </div>
        </div>

        <div className="cta-section">
          <button 
            className="start-advertising-btn"
            onClick={() => navigate('/advertise-with-us/login')}
          >
            {t('advertise.startButton', 'Start Advertising')}
          </button>
          <p className="contact-text">
            {t('advertise.loginPrompt', 'Already have an account? ')}
            <span 
              className="contact-link"
              onClick={() => navigate('/advertise-with-us/login')}
            >
              {t('advertise.loginLink', 'Log in')}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const AdvertiseWithUs = () => {
  return (
    <Routes>
      {/* Landing page */}
      <Route index element={<AdvertiseLanding />} />
      
      {/* Authentication routes */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      
      {/* Onboarding flow */}
      <Route path="questions" element={<Questionnaire />} />
      <Route path="dashboard" element={<Dashboard />} />
      
      {/* Payment flow */}
      <Route path="payment" element={<Payment />} />
      <Route path="success" element={<Success />} />
      
      {/* Redirect to landing by default */}
      <Route path="*" element={<Navigate to="/advertise-with-us" replace />} />
    </Routes>
  );
};

export default AdvertiseWithUs; 