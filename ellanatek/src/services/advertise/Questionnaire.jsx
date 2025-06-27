import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/OnboardingFlow.css';

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    industryType: '',
    budgetRange: '',
    region: ''
  });

  const steps = [
    {
      title: 'Business Information',
      field: 'businessName',
      type: 'text',
      placeholder: 'Enter your business name',
      label: 'What is your business name?'
    },
    {
      title: 'Industry Type',
      field: 'industryType',
      type: 'select',
      label: 'What industry is your business in?',
      options: [
        { value: '', label: 'Select industry...' },
        { value: 'retail', label: 'Retail' },
        { value: 'restaurant', label: 'Restaurant & Food' },
        { value: 'healthcare', label: 'Healthcare' },
        { value: 'beauty', label: 'Beauty & Wellness' },
        { value: 'technology', label: 'Technology' },
        { value: 'automotive', label: 'Automotive' },
        { value: 'real-estate', label: 'Real Estate' },
        { value: 'education', label: 'Education' },
        { value: 'finance', label: 'Finance' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      title: 'Budget Range',
      field: 'budgetRange',
      type: 'select',
      label: 'What is your monthly advertising budget?',
      options: [
        { value: '', label: 'Select budget range...' },
        { value: '1000-3000', label: '1,000 - 3,000 SAR' },
        { value: '3000-5000', label: '3,000 - 5,000 SAR' },
        { value: '5000-10000', label: '5,000 - 10,000 SAR' },
        { value: '10000-20000', label: '10,000 - 20,000 SAR' },
        { value: '20000+', label: '20,000+ SAR' }
      ]
    },
    {
      title: 'Target Region',
      field: 'region',
      type: 'select',
      label: 'Which region do you want to target?',
      options: [
        { value: '', label: 'Select region...' },
        { value: 'khobar', label: 'Khobar' },
        { value: 'dammam', label: 'Dammam' },
        { value: 'dhahran', label: 'Dhahran' },
        { value: 'jubail', label: 'Jubail' },
        { value: 'eastern-province', label: 'Eastern Province (All)' },
        { value: 'riyadh', label: 'Riyadh' },
        { value: 'jeddah', label: 'Jeddah' },
        { value: 'makkah', label: 'Makkah' }
      ]
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Store data in localStorage for dashboard
    localStorage.setItem('advertiserData', JSON.stringify(formData));
    navigate('/advertise-with-us/dashboard');
  };

  const currentStepData = steps[currentStep];
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;
  const isCurrentStepComplete = formData[currentStepData.field] !== '';

  return (
    <div className="onboarding-container">
      <div className="onboarding-form">
        <h2>{currentStepData.title}</h2>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor={currentStepData.field}>
            {currentStepData.label}
          </label>
          
          {currentStepData.type === 'text' ? (
            <input
              type="text"
              id={currentStepData.field}
              name={currentStepData.field}
              value={formData[currentStepData.field]}
              onChange={handleChange}
              placeholder={currentStepData.placeholder}
              required
            />
          ) : (
            <select
              id={currentStepData.field}
              name={currentStepData.field}
              value={formData[currentStepData.field]}
              onChange={handleChange}
              required
            >
              {currentStepData.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="nav-buttons">
          <button
            type="button"
            className="nav-button"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </button>
          
          {currentStep === steps.length - 1 ? (
            <button
              type="button"
              className="onboarding-button"
              onClick={handleSubmit}
              disabled={!isCurrentStepComplete}
              style={{ flex: 1, margin: 0 }}
            >
              Complete Setup
            </button>
          ) : (
            <button
              type="button"
              className="nav-button"
              onClick={handleNext}
              disabled={!isCurrentStepComplete}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire; 