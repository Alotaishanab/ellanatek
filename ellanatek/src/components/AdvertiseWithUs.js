// AdvertiseWithUs.js
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import '../styles/AdvertiseWithUs.css';
import Lottie from 'lottie-react';
import checkAnimation from '../assets/animations/check.json';

const AdvertiseWithUs = ({ onNavigate }) => {
  const { t } = useTranslation();

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
        }, 3000);
      } else {
        alert(t('advertiseWithUs.alert.failedToSend'));
      }
    } catch (error) {
      alert(t('advertiseWithUs.alert.errorSending'));
    }
  };

  return (
    <div className="advertise-with-us-container">
      <Helmet>
        <title>{t('advertiseWithUs.meta.title')}</title>
        <meta name="description" content={t('advertiseWithUs.meta.description')} />
      </Helmet>
      <div className="advertise-with-us-content">
        {!isSubmitted ? (
          <section className="contact-section">
            <div className="left-card">
              <div className="contact-title">{t('advertiseWithUs.contactTitle')}</div>
              <div className="contact-subtitle">{t('advertiseWithUs.contactSubtitle')}</div>
            </div>

            <div className="right-card">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <div className="input-field">
                    <label>
                      {t('advertiseWithUs.form.firstName')}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      required
                      placeholder={t('advertiseWithUs.form.firstNamePlaceholder')}
                    />
                  </div>
                  <div className="input-field">
                    <label>
                      {t('advertiseWithUs.form.lastName')}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      required
                      placeholder={t('advertiseWithUs.form.lastNamePlaceholder')}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-field">
                    <label>
                      {t('advertiseWithUs.form.email')}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      required
                      placeholder={t('advertiseWithUs.form.emailPlaceholder')}
                    />
                  </div>
                  <div className="input-field">
                    <label>
                      {t('advertiseWithUs.form.phoneNumber')}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      onChange={handleChange}
                      required
                      placeholder={t('advertiseWithUs.form.phoneNumberPlaceholder')}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-field">
                    <label>
                      {t('advertiseWithUs.form.businessName')}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      onChange={handleChange}
                      required
                      placeholder={t('advertiseWithUs.form.businessNamePlaceholder')}
                    />
                  </div>
                  <div className="input-field custom-dropdown">
                    <label>
                      {t('advertiseWithUs.form.inquiryType')}
                      <span className="required">*</span>
                    </label>
                    <div className="dropdown">
                      <div className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        {selectedOption || t('advertiseWithUs.form.selectPlaceholder')}
                        <span className="dropdown-arrow"></span>
                      </div>
                      {dropdownOpen && (
                        <ul className="dropdown-menu">
                          <li onClick={() => handleOptionClick(t('advertiseWithUs.form.inquiryOptions.generalInquiry'))}>
                            {t('advertiseWithUs.form.inquiryOptions.generalInquiry')}
                          </li>
                          <li onClick={() => handleOptionClick(t('advertiseWithUs.form.inquiryOptions.adInquiry'))}>
                            {t('advertiseWithUs.form.inquiryOptions.adInquiry')}
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                <div className="input-field">
                  <label>{t('advertiseWithUs.form.message')}</label>
                  <textarea
                    name="message"
                    onChange={handleChange}
                    value={formData.message}
                    maxLength="500"
                    placeholder={t('advertiseWithUs.form.messagePlaceholder')}
                  ></textarea>
                </div>

                <button type="submit" className="send-button">
                  {t('advertiseWithUs.form.sendMessage')}
                </button>
              </form>
            </div>
          </section>
        ) : (
          <div className="animation-container">
            <Lottie animationData={checkAnimation} loop={false} />
            <div className="success-message">{t('advertiseWithUs.successMessage')}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertiseWithUs;
