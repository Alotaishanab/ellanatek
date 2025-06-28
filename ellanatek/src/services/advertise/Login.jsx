import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/OnboardingFlow.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, advertiserData, hasCompletedOnboarding } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Create user data (simulated)
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: formData.email,
        phone: '+966501234567'
      };
      
      // Get existing advertiser data if any
      const existingAdvertiserData = localStorage.getItem('advertiserData');
      const parsedAdvertiserData = existingAdvertiserData ? JSON.parse(existingAdvertiserData) : null;
      
      // Use the context login function
      login(userData, parsedAdvertiserData);
      
      // Navigate based on onboarding status
      if (parsedAdvertiserData && parsedAdvertiserData.businessName) {
        // User has completed onboarding, go to dashboard
        navigate('/advertise-with-us/dashboard');
      } else {
        // First time login, go to questionnaire
        navigate('/advertise-with-us/questions');
      }
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="onboarding-container">
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className="onboarding-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className="auth-link">
          Don't have an account? <Link to="/advertise-with-us/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login; 