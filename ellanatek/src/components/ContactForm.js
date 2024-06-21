import React, { useState } from 'react';
import '../styles/ContactForm.css';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyname: '',
    email: '',
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
      <div className="animation-container">
        {/* Add your SVG or CSS animation here */}
        <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L15.09 7.36L23 8.64L17 14.57L18.18 22.63L12 19.25L5.82 22.63L7 14.57L1 8.64L8.91 7.36L12 0Z" fill="#0f4082"/>
        </svg>
        <p className="company-email">info@ellanatek.com</p>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" className="social-icon"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" className="social-icon"><FaLinkedin /></a>
          <a href="https://twitter.com" target="_blank" className="social-icon"><FaTwitter /></a>
        </div>
      </div>
      <div className="form-container">
        <h2 className="form-title">Hello</h2>
        <p className="form-description">Let's start a conversation! Fill out our contact form, and we'll get back to you as soon as possible.</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="name" className="input-label">My name is</label>
            <input id="name" name="name" placeholder="Enter your name" type="text" value={formData.name} onChange={handleChange} required className="input" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="companyname" className="input-label">I'm from</label>
            <input id="companyname" name="companyname" placeholder="Enter your company name" type="text" value={formData.companyname} onChange={handleChange} required className="input" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email" className="input-label">Here is my email</label>
            <input id="email" name="email" placeholder="Enter your email" type="email" value={formData.email} onChange={handleChange} required className="input" />
          </div>
          <div className="textarea-wrapper">
            <textarea id="message" name="message" placeholder="Enter your message" value={formData.message} onChange={handleChange} required className="textarea"></textarea>
          </div>
          <button type="submit" className="button">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
