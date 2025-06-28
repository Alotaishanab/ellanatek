// src/App.js
import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Contact from './components/Contact';
import AdvertiseWithUs from './components/AdvertiseWithUs';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="App" style={{ overflowX: 'hidden' }}>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about-us" element={<AboutUs />} />
          
          {/* Advertise Routes - All under /advertise-with-us/* */}
          <Route path="/advertise-with-us/*" element={<AdvertiseWithUs />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Redirect Unknown Routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Nav />
        <Footer />
      </div>
    </Router>
  );
};

export default App;