import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaChartLine, FaFileInvoice, FaCheckCircle, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import PricingCards from './components/PricingCards';
import AdMapTracker from './components/AdMapTracker';
import '../../styles/OnboardingFlow.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [advertiserData, setAdvertiserData] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('2weeks');
  const [currentStep, setCurrentStep] = useState('upload'); // upload, details, review, approved
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [adDetails, setAdDetails] = useState({
    title: '',
    description: '',
    targetGender: [],
    targetAge: []
  });
  const [adStatus, setAdStatus] = useState('draft'); // draft, pending, approved
  const [uploadError, setUploadError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load advertiser data from localStorage
    const data = localStorage.getItem('advertiserData');
    if (data) {
      const parsedData = JSON.parse(data);
      // Set default region to 'khobar' if not specified
      if (!parsedData.region) {
        parsedData.region = 'khobar';
      }
      setAdvertiserData(parsedData);
    } else {
      // If no data exists, create default data with khobar region
      setAdvertiserData({
        businessName: 'Advertiser',
        region: 'khobar',
        industryType: 'other',
        budgetRange: '1000-3000'
      });
    }
  }, []);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setAdDetails(prev => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...files.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          file: file
        }))]
      }));
    }
  };

  const validateImageDimensions = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function() {
        const isValid = this.width === 1080 && this.height === 1920;
        resolve(isValid);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError('');

    // Check file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file only.');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size must be less than 10MB.');
      return;
    }

    // Validate dimensions
    const isValidDimensions = await validateImageDimensions(file);
    if (!isValidDimensions) {
      setUploadError('Image must be exactly 1080x1920 pixels (portrait format).');
      return;
    }

    // Success - store the image
    setUploadedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setCurrentStep('details');
  };

  const handleAdDetailsChange = (field, value) => {
    setAdDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTargetAudienceChange = (type, value) => {
    setAdDetails(prev => ({
      ...prev,
      [type]: prev[type].includes(value) 
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
  };

  const handleSubmitAd = () => {
    if (!adDetails.title.trim() || !adDetails.description.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setAdStatus('pending');
    setCurrentStep('review');

    // Simulate approval after 3 seconds
    setTimeout(() => {
      setAdStatus('approved');
      setIsSubmitting(false);
    }, 3000);
  };

  const handleProceedToPayment = () => {
    // Store campaign data and redirect to payment
    const campaignData = {
      adImage: uploadedImage,
      adDetails,
      selectedPlan,
      advertiserData
    };
    localStorage.setItem('campaignData', JSON.stringify(campaignData));
    navigate('/advertise-with-us/payment');
  };

  const renderUploadStep = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: '12px',
      padding: '25px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      transition: 'transform 0.3s ease'
    }}>
      <FaCloudUploadAlt size={24} color="#8A2BE2" style={{ marginBottom: '15px' }} />
      <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '10px' }}>Upload Ad Creative</h3>
      <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.5', marginBottom: '15px' }}>
        Upload your ad image. Required dimensions: 1080x1920 pixels (portrait format).
      </p>
      
      {uploadError && (
        <div style={{
          background: 'rgba(255, 0, 0, 0.1)',
          border: '1px solid rgba(255, 0, 0, 0.3)',
          borderRadius: '6px',
          padding: '10px',
          marginBottom: '15px',
          color: '#ff6b6b',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <FaExclamationTriangle size={16} />
          {uploadError}
        </div>
      )}

      <div 
        className="upload-area" 
        onClick={() => document.getElementById('adImageInput').click()}
        style={{
          border: '2px dashed rgba(138, 43, 226, 0.5)',
          borderRadius: '8px',
          padding: '30px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backgroundColor: 'rgba(138, 43, 226, 0.05)'
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = '#8A2BE2';
          e.target.style.backgroundColor = 'rgba(138, 43, 226, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'rgba(138, 43, 226, 0.5)';
          e.target.style.backgroundColor = 'rgba(138, 43, 226, 0.05)';
        }}
      >
        <FaCloudUploadAlt size={32} color="#8A2BE2" style={{ marginBottom: '10px' }} />
        <div style={{ color: '#fff', fontSize: '16px', marginBottom: '5px' }}>
          Drop your ad image here or click to upload
        </div>
        <div style={{ color: '#ccc', fontSize: '12px' }}>
          1080x1920 pixels • JPG, PNG • Max 10MB
        </div>
        <input
          type="file"
          id="adImageInput"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: '12px',
      padding: '25px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)'
    }}>
      <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>Ad Details</h3>
      
      {/* Image Preview */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '25px' }}>
        <div style={{ flex: 1 }}>
          <img 
            src={imagePreview} 
            alt="Ad Preview" 
            style={{
              width: '120px',
              height: '213px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '2px solid #8A2BE2'
            }}
          />
        </div>
        <div style={{ flex: 2 }}>
          <button 
            onClick={() => {
              setCurrentStep('upload');
              setUploadedImage(null);
              setImagePreview(null);
            }}
            style={{
              background: 'transparent',
              color: '#8A2BE2',
              border: '1px solid #8A2BE2',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Change Image
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
            Ad Title *
          </label>
          <input
            type="text"
            value={adDetails.title}
            onChange={(e) => handleAdDetailsChange('title', e.target.value)}
            placeholder="Enter your ad title"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              fontSize: '14px'
            }}
          />
        </div>

        <div>
          <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
            Description * ({adDetails.description.length}/300)
          </label>
          <textarea
            value={adDetails.description}
            onChange={(e) => handleAdDetailsChange('description', e.target.value.slice(0, 300))}
            placeholder="Describe your product or service..."
            rows="4"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#fff',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
            Target Gender
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Male', 'Female', 'All'].map(gender => (
              <label key={gender} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ccc' }}>
                <input
                  type="checkbox"
                  checked={adDetails.targetGender.includes(gender)}
                  onChange={() => handleTargetAudienceChange('targetGender', gender)}
                  style={{ accentColor: '#8A2BE2' }}
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
            Target Age Group
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['18-24', '25-34', '35-44', '45-54', '55+'].map(age => (
              <label key={age} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ccc' }}>
                <input
                  type="checkbox"
                  checked={adDetails.targetAge.includes(age)}
                  onChange={() => handleTargetAudienceChange('targetAge', age)}
                  style={{ accentColor: '#8A2BE2' }}
                />
                {age}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmitAd}
          disabled={!adDetails.title.trim() || !adDetails.description.trim()}
          style={{
            background: adDetails.title.trim() && adDetails.description.trim() ? '#8A2BE2' : 'rgba(138, 43, 226, 0.3)',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: adDetails.title.trim() && adDetails.description.trim() ? 'pointer' : 'not-allowed',
            marginTop: '10px'
          }}
        >
          Submit for Review
        </button>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: '12px',
      padding: '25px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        {adStatus === 'pending' ? (
          <>
            <FaClock size={24} color="#f39c12" />
            <h3 style={{ color: '#f39c12', fontSize: '18px' }}>Review in Progress</h3>
          </>
        ) : (
          <>
            <FaCheckCircle size={24} color="#27ae60" />
            <h3 style={{ color: '#27ae60', fontSize: '18px' }}>Ad Approved!</h3>
          </>
        )}
      </div>

      {adStatus === 'pending' ? (
        <div>
          <p style={{ color: '#ccc', marginBottom: '20px' }}>
            Your ad is being reviewed by our team. This usually takes a few moments...
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '15px',
            background: 'rgba(243, 156, 18, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(243, 156, 18, 0.3)'
          }}>
            <div className="spinner" style={{
              width: '20px',
              height: '20px',
              border: '2px solid rgba(243, 156, 18, 0.3)',
              borderTop: '2px solid #f39c12',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <span style={{ color: '#f39c12', fontSize: '14px' }}>
              Checking content guidelines and quality...
            </span>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ color: '#ccc', marginBottom: '20px' }}>
            Great! Your ad meets all our guidelines and is ready to go live.
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '15px',
            background: 'rgba(39, 174, 96, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(39, 174, 96, 0.3)',
            marginBottom: '20px'
          }}>
            <FaCheckCircle size={16} color="#27ae60" />
            <span style={{ color: '#27ae60', fontSize: '14px' }}>
              Ad approved and ready for campaign launch
            </span>
          </div>
          
          <button
            onClick={handleProceedToPayment}
            style={{
              background: '#8A2BE2',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Proceed to Payment
          </button>
        </div>
      )}

      {/* Ad Preview Card */}
      <div style={{
        marginTop: '25px',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '15px' }}>Ad Preview</h4>
        <div style={{ display: 'flex', gap: '15px' }}>
          <img 
            src={imagePreview} 
            alt="Ad Preview" 
            style={{
              width: '80px',
              height: '142px',
              objectFit: 'cover',
              borderRadius: '6px'
            }}
          />
          <div style={{ flex: 1 }}>
            <h5 style={{ color: '#fff', fontSize: '14px', marginBottom: '8px' }}>{adDetails.title}</h5>
            <p style={{ color: '#ccc', fontSize: '12px', lineHeight: '1.4' }}>{adDetails.description}</p>
            <div style={{ marginTop: '10px', fontSize: '11px', color: '#8A2BE2' }}>
              Target: {adDetails.targetGender.join(', ')} • {adDetails.targetAge.join(', ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a0a25, #0e051b)',
      padding: '20px',
      paddingBottom: '120px' // Space for bottom navigation
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      {/* Header */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        marginBottom: '30px' 
      }}>
        <div className="dashboard-welcome">
          <h1>Welcome back, {advertiserData?.businessName || 'Advertiser'}!</h1>
          <p>Your advertising journey starts here. Create your campaign and start reaching your audience.</p>
        </div>

      {/* Main Layout - Stripe-like 2-column */}
      <div className="dashboard-grid-layout" style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '350px 1fr',
        gap: '30px'
      }}>
        
        {/* Left Sidebar */}
        <div className="dashboard-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Business Profile Card */}
          {advertiserData && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '12px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)'
            }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>Business Profile</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <span style={{ color: '#8A2BE2', fontSize: '14px', fontWeight: '600' }}>Industry: </span>
                  <span style={{ color: '#eee', fontSize: '14px' }}>{advertiserData.industryType}</span>
                </div>
                <div>
                  <span style={{ color: '#8A2BE2', fontSize: '14px', fontWeight: '600' }}>Target Region: </span>
                  <span style={{ color: '#eee', fontSize: '14px' }}>{advertiserData.region}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '30px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <FaMapMarkedAlt size={24} color="#8A2BE2" />
                <h3 style={{ margin: 0, color: '#fff' }}>Campaign Region - {getRegionLabel(advertiserData.region)}</h3>
              </div>
              <MapPreview region={advertiserData.region} darkMode={true} />
            </div>
          </>
        )}

        {/* Campaign Creation Section */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: '12px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <FaRocket size={24} color="#8A2BE2" />
            <h3 style={{ margin: 0, color: '#fff' }}>Create Your Campaign</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                Campaign Title *
              </label>
              <input
                type="text"
                value={adDetails.title}
                onChange={(e) => setAdDetails(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Summer Sale 2024"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  fontSize: '14px'
                }}
              />
            </div>
            <div>
              <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                Description (Optional)
              </label>
              <input
                type="text"
                value={adDetails.description}
                onChange={(e) => setAdDetails(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of your campaign"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* File Upload */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
              Upload Ad Creative (Images/Videos)
            </label>
            <div 
              className="upload-area" 
              onClick={() => document.getElementById('fileInput').click()}
              style={{ marginBottom: '15px' }}
            >
              <FaCloudUploadAlt size={24} color="#8A2BE2" />
              <div className="upload-text">
                Click to upload or drag and drop your files here
              </div>
              <input
                type="file"
                id="fileInput"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>

            {/* Uploaded Files List */}
            {adDetails.uploadedFiles.length > 0 && (
              <div style={{ marginTop: '15px' }}>
                <h5 style={{ color: '#fff', fontSize: '14px', marginBottom: '10px' }}>Uploaded Files:</h5>
                {adDetails.uploadedFiles.map((file, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '6px',
                    marginBottom: '8px'
                  }}>
                    <span style={{ color: '#fff', fontSize: '12px' }}>
                      {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
                    </span>
                    <button
                      onClick={() => removeFile(index)}
                      style={{
                        background: 'rgba(255, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 0, 0, 0.3)',
                        color: '#ff6b6b',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing Cards */}
          <PricingCards selectedPlan={selectedPlan} onPlanSelect={setSelectedPlan} />

          {/* Start Campaign Button */}
          <button
            onClick={handleStartCampaign}
            disabled={!adDetails.title.trim()}
            style={{
              width: '100%',
              padding: '16px 24px',
              background: adDetails.title.trim() ? '#8A2BE2' : 'rgba(138, 43, 226, 0.3)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: adDetails.title.trim() ? 'pointer' : 'not-allowed',
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <FaRocket size={16} />
            Start Campaign & Proceed to Payment
          </button>
        </div>

        {/* Right Main Content */}
        <div className="dashboard-main-content" style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* Live Map Tracker */}
          <AdMapTracker />

          {/* Ad Submission Workflow */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px' 
          }}>
            
            {/* Dynamic Ad Submission Card */}
            {currentStep === 'upload' && renderUploadStep()}
            {currentStep === 'details' && renderDetailsStep()}
            {currentStep === 'review' && renderReviewStep()}

            {/* Other Action Cards */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '12px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <FaChartLine size={24} color="#8A2BE2" style={{ marginBottom: '15px' }} />
              <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '10px' }}>Analytics Dashboard</h3>
              <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.5', marginBottom: '15px' }}>
                View detailed analytics, engagement metrics, and campaign performance.
              </p>
              <button style={{
                background: '#8A2BE2',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                View Analytics
              </button>
            </div>
          </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '12px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <FaFileInvoice size={24} color="#8A2BE2" style={{ marginBottom: '15px' }} />
              <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '10px' }}>Billing & Invoices</h3>
              <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.5', marginBottom: '15px' }}>
                Manage payments, view invoices, and track billing history.
              </p>
              <button style={{
                background: '#8A2BE2',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                View Billing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 