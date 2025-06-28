import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdvertiseOnboarding from './AdvertiseOnboarding';
import Login from '../services/advertise/Login';
import Signup from '../services/advertise/Signup';
import Questionnaire from '../services/advertise/Questionnaire';
import Dashboard from '../services/advertise/Dashboard';
import Account from '../services/advertise/Account';
import Payment from '../services/advertise/Payment';
import Success from '../services/advertise/Success';
import AuthGuard from '../services/advertise/AuthGuard';

const AdvertiseWithUs = () => {
  return (
    <Routes>
      {/* Onboarding landing page */}
      <Route index element={<AdvertiseOnboarding />} />
      
      {/* Authentication routes */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      
      {/* Onboarding flow */}
      <Route path="questions" element={<AuthGuard><Questionnaire /></AuthGuard>} />
      <Route path="dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
      <Route path="account" element={<AuthGuard><Account /></AuthGuard>} />
      
      {/* Payment flow */}
      <Route path="payment" element={<AuthGuard><Payment /></AuthGuard>} />
      <Route path="success" element={<AuthGuard><Success /></AuthGuard>} />
      
      {/* Redirect to landing by default */}
      <Route path="*" element={<Navigate to="/advertise-with-us" replace />} />
    </Routes>
  );
};

export default AdvertiseWithUs; 