import React, { useState } from 'react';
import '../styles/ContactForm.css';
import EmailIcon from '../assets/svg/email.svg';
import PhoneIcon from '../assets/svg/phone.svg';
import LocationIcon from '../assets/svg/location.svg';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    businessName: '',
    inquiryType: '',
    message: '',
  });

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
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      alert('Error sending message');
    }
  };

  return (
    <section className="contact-section">
      <div className="left-card">
        <div className="contact-title">Contact us</div>
        <div className="contact-subtitle">Contact us and we will be right back!</div>
        <div className="contact-info">
          <div className="contact-info-item">
            <div className="icon-wrapper">
              <img src={PhoneIcon} alt="Phone Icon" />
            </div>
            <div className="contact-text">+966 55 66 55562</div>
          </div>
          <div className="contact-info-item">
            <div className="icon-wrapper">
              <img src={EmailIcon} alt="Email Icon" />
            </div>
            <div className="contact-text">admotion@gmail.com</div>
          </div>
          <div className="contact-info-item">
            <div className="icon-wrapper">
              <img src={LocationIcon} alt="Location Icon" />
            </div>
            <div className="contact-text">Al-Khobar, Saudi Arabia</div>
          </div>
        </div>
        <div className="stretch"></div>
      </div>

      <div className="right-card">
        <div className="input-group">
          <div className="input-field">
            <label>First Name</label>
            <input type="text" name="firstName" onChange={handleChange} />
          </div>
          <div className="input-field">
            <label>Last Name</label>
            <input type="text" name="lastName" onChange={handleChange} />
          </div>
        </div>
        <div className="input-group">
          <div className="input-field">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} />
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
            <select name="inquiryType" onChange={handleChange}>
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
  );
};

export default ContactForm;
