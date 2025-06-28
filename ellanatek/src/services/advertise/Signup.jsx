import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';
import ellantekAPI from '../../services/api';
import '../../styles/OnboardingFlow.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    termsAccepted: false,
    privacyAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsVerification, setNeedsVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
    setErrors(prev => ({ ...prev, [name]: undefined })); // clear error on change
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!formData.phone.startsWith('+')) {
      newErrors.phone = 'Phone number must include country code (e.g., +966512345678)';
      valid = false;
    } else if (!/^\+\d{6,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number format is invalid';
      valid = false;
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    }
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the Terms and Conditions';
      valid = false;
    }
    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = 'You must accept the Privacy Policy';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await ellantekAPI.signup(formData);
      if (response.ok && response.token && response.user) {
        localStorage.setItem('ellanatek_user', JSON.stringify(response.user));
        setNeedsVerification(true);
      }
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await ellantekAPI.verifyCode(verificationCode);
      if (response.ok) {
        if (response.user) {
          localStorage.setItem('ellanatek_user', JSON.stringify(response.user));
        }
        navigate('/advertise-with-us/account');
      }
    } catch (err) {
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    try {
      setError('');
      await ellantekAPI.sendVerificationCode();
      setError('');
      const successMsg = document.createElement('div');
      successMsg.style.cssText = 'position:fixed;top:20px;right:20px;background:#28a745;color:white;padding:10px 20px;border-radius:5px;z-index:1000;';
      successMsg.textContent = 'Verification code sent!';
      document.body.appendChild(successMsg);
      setTimeout(() => document.body.removeChild(successMsg), 3000);
    } catch (err) {
      setError(err.message || 'Failed to resend code.');
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  if (needsVerification) {
    return (
      <div className="onboarding-container">
        <form className="onboarding-form" onSubmit={handleVerification}>
          <h2>Verify Your Phone</h2>
          <p>We've sent a verification code to {formData.phone}</p>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="verificationCode">Verification Code</label>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              placeholder="Enter 6-digit code"
              maxLength="6"
              style={{ fontSize: '18px', textAlign: 'center', letterSpacing: '3px' }}
            />
          </div>

          <button
            type="submit"
            className="onboarding-button"
            disabled={isLoading || verificationCode.length !== 6}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>

          <div className="auth-link">
            Didn't receive the code?{' '}
            <button type="button" onClick={resendCode} className="password-toggle">
              Resend
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="onboarding-container">
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input-field"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              maxLength="50"
            />
            {errors.firstName && <small style={{ color: 'red' }}>{errors.firstName}</small>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="input-field"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              maxLength="50"
            />
            {errors.lastName && <small style={{ color: 'red' }}>{errors.lastName}</small>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
          />
          {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="input-field"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number (e.g., +966512345678)"
          />
          <small style={{ color: '#eee', fontSize: '12px' }}>
            Include country code (e.g., +966 for Saudi Arabia)
          </small>
          {errors.phone && <small style={{ color: 'red' }}>{errors.phone}</small>}
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <label htmlFor="password">Password *</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            minLength="6"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <small style={{ color: '#eee', fontSize: '12px' }}>
            Minimum 6 characters
          </small>
          {errors.password && <small style={{ color: 'red' }}>{errors.password}</small>}
        </div>

        <div className="form-group">
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <span className="checkmark">{formData.termsAccepted && <FaCheck />}</span>
            <span className="checkbox-text">
              I agree to the{' '}
              <Link to="/terms-and-conditions" target="_blank" className="link">
                Terms and Conditions
              </Link>
              {' *'}
            </span>
          </label>
          {errors.termsAccepted && <small style={{ color: 'red' }}>{errors.termsAccepted}</small>}
        </div>

        <div className="form-group">
          <label className="checkbox-container">
            <input
              type="checkbox"
              name="privacyAccepted"
              checked={formData.privacyAccepted}
              onChange={handleChange}
            />
            <span className="checkmark">{formData.privacyAccepted && <FaCheck />}</span>
            <span className="checkbox-text">
              I agree to the{' '}
              <Link to="/privacy-policy" target="_blank" className="link">
                Privacy Policy
              </Link>
              {' *'}
            </span>
          </label>
          {errors.privacyAccepted && <small style={{ color: 'red' }}>{errors.privacyAccepted}</small>}
        </div>

        <button
          type="submit"
          className="onboarding-button"
          disabled={isLoading || !formData.termsAccepted || !formData.privacyAccepted}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="auth-link">
          Already have an account? <Link to="/advertise-with-us/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
