import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdvertiseOnboarding from './AdvertiseOnboarding';
import Login from '../services/advertise/Login';
import Signup from '../services/advertise/Signup';
import Questionnaire from '../services/advertise/Questionnaire';
import Dashboard from '../services/advertise/Dashboard';
import Payment from '../services/advertise/Payment';
import Success from '../services/advertise/Success';

const AdvertiseWithUs = () => {
  return (
    <Routes>
      {/* Onboarding landing page */}
      <Route index element={<AdvertiseOnboarding />} />
      
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