import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import '../styles/AdvertiseWithUs.css';
import Lottie from 'lottie-react';
import checkAnimation from '../assets/animations/check.json';
import loadingAnimation from '../assets/animations/loading.json';

const AdvertiseWithUs = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // <-- NEW: Loading state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    businessName: '',
    inquiryType: '',
    message: '',
  });

  // Validation rules
  const validate = {
    firstName: (value) => 
      !value.trim() ? t('validation.required') : 
      !/^[a-zA-Z\u0600-\u06FF\s']+$/.test(value) ? t('validation.invalidName') : null,
      
    lastName: (value) => 
      !value.trim() ? t('validation.required') : 
      !/^[a-zA-Z\u0600-\u06FF\s']+$/.test(value) ? t('validation.invalidName') : null,
      
    email: (value) => 
      !value ? t('validation.required') : 
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? t('validation.invalidEmail') : null,
      
    phoneNumber: (value) => 
      !value ? t('validation.required') : 
      !/^05\d{8}$/.test(value) ? t('validation.invalidPhone') : null,
      
    businessName: (value) => 
      !value.trim() ? t('validation.required') : 
      value.length < 2 ? t('validation.minLength', { count: 2 }) : null,
      
    inquiryType: (value) => !value ? t('validation.required') : null,
    
    message: (value) => value.length > 500 ? t('validation.maxLength', { count: 500 }) : null
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone number validation: only allow numbers
    if (name === 'phoneNumber') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({ ...prev, [name]: numbersOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate[name](value) }));
    }
  };

  const handlePhoneKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate[name](value) }));
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const inquiryValue = 
      option === t('advertiseWithUs.form.inquiryOptions.generalInquiry') 
        ? 'general' 
        : 'ad';
    setFormData((prev) => ({ ...prev, inquiryType: inquiryValue }));
    setErrors((prev) => ({ ...prev, inquiryType: validate.inquiryType(inquiryValue) }));
    setDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(newTouched);

    const validationErrors = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = validate[key](value);
      return acc;
    }, {});

    setErrors(validationErrors);

    // If there's any validation error, do not proceed
    if (Object.values(validationErrors).some((error) => error)) return;

    try {
      // Start loading
      setIsLoading(true);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // End loading
      setIsLoading(false);

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => onNavigate(0), 3000);
      } else {
        alert(t('advertiseWithUs.alert.failedToSend'));
      }
    } catch (error) {
      setIsLoading(false);
      alert(t('advertiseWithUs.alert.errorSending'));
    }
  };

  // Ensure phone number always starts with '05'
  useEffect(() => {
    if (formData.phoneNumber && !formData.phoneNumber.startsWith('05')) {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: '05' + prev.phoneNumber.replace(/^05/, ''),
      }));
    }
  }, [formData.phoneNumber]);

  return (
    <div className="advertise-with-us-container">
      <Helmet>
        <title>{t('advertiseWithUs.meta.title')}</title>
        <meta name="description" content={t('advertiseWithUs.meta.description')} />
      </Helmet>
      
      <div className="advertise-with-us-content">
        {/** 1) If loading, show loading animation */}
        {isLoading && (
          <div className="animation-overlay">
            <div className="animation-container">
              <Lottie 
                animationData={loadingAnimation} 
                loop={true}
                style={{ width: 400, height: 400 }}
              />
              <div className="loading-message">
                {t('advertiseWithUs.loadingMessage')}
              </div>
            </div>
          </div>
        )}

        {/** 2) If not submitted and not loading, show the form */}
        {!isSubmitted && !isLoading && (
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
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder={t('advertiseWithUs.form.firstNamePlaceholder')}
                    />
                    {errors.firstName && <div className="error-message">{errors.firstName}</div>}
                  </div>
                  <div className="input-field">
                    <label>
                      {t('advertiseWithUs.form.lastName')}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder={t('advertiseWithUs.form.lastNamePlaceholder')}
                    />
                    {errors.lastName && <div className="error-message">{errors.lastName}</div>}
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
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder={t('advertiseWithUs.form.emailPlaceholder')}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                  <div className="input-field">
                    <label>
                      {t('advertiseWithUs.form.phoneNumber')}
                      <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      onKeyPress={handlePhoneKeyPress}
                      onBlur={handleBlur}
                      required
                      pattern="05\d{8}"
                      maxLength="10"
                      placeholder={t('advertiseWithUs.form.phoneNumberPlaceholder')}
                    />
                    {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
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
                      value={formData.businessName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder={t('advertiseWithUs.form.businessNamePlaceholder')}
                    />
                    {errors.businessName && <div className="error-message">{errors.businessName}</div>}
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
                          {[
                            t('advertiseWithUs.form.inquiryOptions.generalInquiry'), 
                            t('advertiseWithUs.form.inquiryOptions.adInquiry')
                          ].map((option) => (
                            <li key={option} onClick={() => handleOptionClick(option)}>
                              {option}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {errors.inquiryType && <div className="error-message">{errors.inquiryType}</div>}
                  </div>
                </div>
                <div className="input-field">
                  <label>{t('advertiseWithUs.form.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength="500"
                    placeholder={t('advertiseWithUs.form.messagePlaceholder')}
                  />
                  <div className="character-counter">
                    {500 - formData.message.length} {t('validation.charactersLeft')}
                  </div>
                  {errors.message && <div className="error-message">{errors.message}</div>}
                </div>

                <button 
                  type="submit" 
                  className="send-button"
                  disabled={Object.values(errors).some((error) => error)}
                >
                  {t('advertiseWithUs.form.sendMessage')}
                </button>
              </form>
            </div>
          </section>
        )}

        {/** 3) If submitted and not loading, show success animation */}
        {isSubmitted && !isLoading && (
          <div className="animation-overlay">
            <div className="animation-container">
              <Lottie 
                animationData={checkAnimation} 
                loop={false}
                style={{ width: 400, height: 400 }}
              />
              <div className="success-message">
                {t('advertiseWithUs.successMessage')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertiseWithUs;
