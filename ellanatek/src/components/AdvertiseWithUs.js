import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/AdvertiseWithUs.css';
import EmailIcon from '../assets/svg/email.svg';
import LocationIcon from '../assets/svg/location.svg';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5004/api/contact', {
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
              <div className="contact-info">
                <div className="contact-info-item">
                  <div className="icon-wrapper">
                    <img src={EmailIcon} alt="Email Icon" />
                  </div>
                  <div className="contact-text">info@admotionsa.com</div>
                </div>
                <div className="contact-info-item">
                  <div className="icon-wrapper">
                    <img src={LocationIcon} alt="Location Icon" />
                  </div>
                  <div className="contact-text">Al-Khobar, Saudi Arabia</div>
                </div>
              </div>
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
                <div className="input-field">
                  <label>Inquiry Type</label>
                  <select name="inquiryType" onChange={handleChange} required>
                    <option value="">Select...</option>
                    <option value="general">General Inquiry</option>
                    <option value="ad">Ad Inquiry</option>
                  </select>
                </div>
              </div>
              <div className="input-field">
                <label>Message</label>
                <textarea name="message" onChange={handleChange}></textarea>
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
