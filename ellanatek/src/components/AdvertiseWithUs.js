import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/AdvertiseWithUs.css';
import Lottie from 'lottie-react';
import checkAnimation from '../assets/animations/check.json';

const AdvertiseWithUs = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    businessName: '',
    inquiryType: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is the message and enforce the character limit
    if (name === 'message' && value.length > 500) {
      return; // Do nothing if the limit is exceeded
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setFormData({
      ...formData,
      inquiryType: option === 'General Inquiry' ? 'general' : 'ad',
    });
    setDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onNavigate(0); // Navigate to home after 3 seconds
        }, 3000); // 3 seconds delay
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      alert('Error sending message');
    }
  };

  return (
    <div className="advertise-with-us-container">
      <Helmet>
        <title>Advertise With Us - AdMotion</title>
        <meta name="description" content="Get in touch with AdMotion to learn how our mobile advertising solutions can help grow your business. Contact us today!" />
      </Helmet>
      <div className="advertise-with-us-content">
        {!isSubmitted ? (
          <section className="contact-section">
            <div className="left-card">
              <div className="contact-title">Get in Touch</div>
              <div className="contact-subtitle">Contact us and we will get back to you!</div>
            </div>

            <div className="right-card">
              <div className="input-group">
                <div className="input-field">
                  <label>First Name</label>
                  <input type="text" name="firstName" onChange={handleChange} required />
                </div>
                <div className="input-field">
                  <label>Last Name</label>
                  <input type="text" name="lastName" onChange={handleChange} required />
                </div>
              </div>
              <div className="input-group">
                <div className="input-field">
                  <label>Email</label>
                  <input type="email" name="email" onChange={handleChange} required />
                </div>
                <div className="input-field">
                  <label>Phone Number</label>
                  <input type="tel" name="phoneNumber" onChange={handleChange} />
                </div>
              </div>
              <div className="input-group">
                <div className="input-field">
                  <label>Business Name</label>
                  <input type="text" name="businessName" onChange={handleChange} />
                </div>
                <div className="input-field custom-dropdown">
                  <label>Inquiry Type</label>
                  <div className="dropdown">
                    <div className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                      {selectedOption || 'Select...'}
                      <span className="dropdown-arrow"></span>
                    </div>
                    {dropdownOpen && (
                      <ul className="dropdown-menu">
                        <li onClick={() => handleOptionClick('General Inquiry')}>General Inquiry</li>
                        <li onClick={() => handleOptionClick('Ad Inquiry')}>Ad Inquiry</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Message</label>
                <textarea
                  name="message"
                  onChange={handleChange}
                  value={formData.message}
                  maxLength="500" // HTML attribute to enforce character limit
                ></textarea>
              </div>

              <div className="send-button" onClick={handleSubmit}>Send Message</div>
            </div>
          </section>
        ) : (
          <div className="animation-container">
            <Lottie animationData={checkAnimation} loop={false} />
            <div className="success-message">Contact Form Sent</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertiseWithUs;
