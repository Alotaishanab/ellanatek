import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaCloudUploadAlt, 
  FaChartLine, 
  FaFileInvoice, 
  FaMapMarkedAlt, 
  FaRocket, 
  FaSignOutAlt,
  FaUser,
  FaDollarSign,
  FaMapPin,
  FaCrown,
  FaCheck,
  FaImage,
  FaVideo
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import ContactMap from '../../components/ContactMap';
import AdPreview from './components/AdPreview';
import AdLibrary from './components/AdLibrary';
import '../../styles/OnboardingFlow.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, advertiserData, logout } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('2weeks');
  const [adDetails, setAdDetails] = useState({
    title: '',
    description: '',
    uploadedFiles: []
  });
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Ensure we have default data if advertiser data is missing
    if (!advertiserData || !advertiserData.region) {
      // This handles the case where user is authenticated but hasn't completed questionnaire
      console.log('No advertiser data found, user may need to complete questionnaire');
    }
  }, [advertiserData]);

  const handleLogout = () => {
    // Use the context logout function
    logout();
    navigate('/advertise-with-us/login');
  };

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

  const removeFile = (index) => {
    setAdDetails(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

  const handleStartCampaign = () => {
    if (!adDetails.title.trim()) {
      alert('Please enter a campaign title');
      return;
    }

    // Create campaign data
    const campaignData = {
      advertiserData: safeAdvertiserData,
      selectedPlan,
      adDetails,
      timestamp: new Date().toISOString()
    };

    // Store campaign data for payment
    localStorage.setItem('campaignData', JSON.stringify(campaignData));
    
    // Navigate to payment
    navigate('/advertise-with-us/payment');
  };

  const getIndustryLabel = (value) => {
    const industries = {
      'retail': 'Retail',
      'restaurant': 'Restaurant & Food',
      'healthcare': 'Healthcare',
      'beauty': 'Beauty & Wellness',
      'technology': 'Technology',
      'automotive': 'Automotive',
      'real-estate': 'Real Estate',
      'education': 'Education',
      'finance': 'Finance',
      'other': 'Other'
    };
    return industries[value] || value;
  };

  const getBudgetLabel = (value) => {
    const budgets = {
      '1000-3000': '1,000 - 3,000 SAR',
      '3000-5000': '3,000 - 5,000 SAR',
      '5000-10000': '5,000 - 10,000 SAR',
      '10000-20000': '10,000 - 20,000 SAR',
      '20000+': '20,000+ SAR'
    };
    return budgets[value] || value;
  };

  const getRegionLabel = (value) => {
    const regions = {
      'khobar': 'Khobar',
      'dammam': 'Dammam',
      'dhahran': 'Dhahran',
      'jubail': 'Jubail',
      'eastern-province': 'Eastern Province (All)',
      'riyadh': 'Riyadh',
      'jeddah': 'Jeddah',
      'makkah': 'Makkah'
    };
    return regions[value] || value;
  };

  // Provide fallback data if advertiserData is missing
  const safeAdvertiserData = advertiserData || {
    businessName: 'Your Business',
    region: 'khobar',
    industryType: 'other',
    budgetRange: '1000-3000'
  };

  const plans = [
    {
      id: '1week',
      name: '1 Week Campaign',
      price: 1900,
      duration: '7 days',
      features: ['4 AdBoxes', 'Basic Analytics', 'Email Support'],
      popular: false
    },
    {
      id: '2weeks',
      name: '2 Weeks Campaign',
      price: 3500,
      duration: '14 days',
      features: ['8 AdBoxes', 'Advanced Analytics', 'Priority Support', 'Campaign Optimization'],
      popular: true
    },
    {
      id: '1month',
      name: '1 Month Campaign',
      price: 6500,
      duration: '30 days',
      features: ['16 AdBoxes', 'Premium Analytics', '24/7 Support', 'A/B Testing', 'Dedicated Manager'],
      popular: false
    }
  ];

  const MapComponent = () => (
    <div style={{
      height: '300px',
      borderRadius: '12px',
      border: '1px solid rgba(138, 43, 226, 0.3)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <ContactMap />
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '500'
      }}>
        Campaign Region: {getRegionLabel(safeAdvertiserData.region)}
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a0a25, #0e051b)',
      padding: '20px',
      paddingBottom: '140px' // Space for floating bottom navigation
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Header with Logout */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '40px'
        }}>
          <div className="dashboard-welcome">
            <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
              Welcome back, {safeAdvertiserData.businessName || user?.firstName || 'Advertiser'}!
            </h1>
            <p style={{ fontSize: '16px', opacity: 0.8 }}>
              Your advertising journey starts here. Create your campaign and start reaching your audience.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => navigate('/advertise-with-us/account')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <FaUser size={14} />
              Account
            </button>
            
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(231, 76, 60, 0.2)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(231, 76, 60, 0.3)',
                color: '#e74c3c',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(231, 76, 60, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(231, 76, 60, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <FaSignOutAlt size={14} />
              Logout
            </button>
          </div>
        </div>

        {advertiserData && (
          <>
            {/* Business Profile Section */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '2px solid rgba(138, 43, 226, 0.3)'
              }}>
                <FaUser size={24} color="#8A2BE2" />
                <h2 style={{ 
                  margin: 0, 
                  color: '#fff', 
                  fontSize: '24px', 
                  fontWeight: '600' 
                }}>
                  Your Business Profile
                </h2>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '20px' 
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <FaUser size={18} color="#8A2BE2" />
                    <span style={{ color: '#8A2BE2', fontSize: '14px', fontWeight: '600' }}>Industry</span>
                  </div>
                  <span style={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>
                    {getIndustryLabel(advertiserData.industryType)}
                  </span>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <FaDollarSign size={18} color="#8A2BE2" />
                    <span style={{ color: '#8A2BE2', fontSize: '14px', fontWeight: '600' }}>Budget Range</span>
                  </div>
                  <span style={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>
                    {getBudgetLabel(advertiserData.budgetRange)}
                  </span>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <FaMapPin size={18} color="#8A2BE2" />
                    <span style={{ color: '#8A2BE2', fontSize: '14px', fontWeight: '600' }}>Target Region</span>
                  </div>
                  <span style={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>
                    {getRegionLabel(advertiserData.region)}
                  </span>
                </div>
              </div>
            </div>

            {/* Campaign Region Section */}
            <div style={{ marginBottom: '40px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '2px solid rgba(138, 43, 226, 0.3)'
              }}>
                <FaMapMarkedAlt size={24} color="#8A2BE2" />
                <h2 style={{ 
                  margin: 0, 
                  color: '#fff', 
                  fontSize: '24px', 
                  fontWeight: '600' 
                }}>
                  Campaign Region - {getRegionLabel(advertiserData.region)}
                </h2>
              </div>
                              <MapComponent />
            </div>
          </>
        )}

        {/* Campaign Creation Section */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: '16px',
          padding: '30px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(15px)',
          marginBottom: '40px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '25px',
            paddingBottom: '15px',
            borderBottom: '2px solid rgba(138, 43, 226, 0.3)'
          }}>
            <FaRocket size={24} color="#8A2BE2" />
            <h2 style={{ 
              margin: 0, 
              color: '#fff', 
              fontSize: '24px', 
              fontWeight: '600' 
            }}>
              Create Your Campaign
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
            <div>
              <label style={{ color: '#fff', fontSize: '16px', marginBottom: '10px', display: 'block', fontWeight: '500' }}>
                Campaign Title *
              </label>
              <input
                type="text"
                value={adDetails.title}
                onChange={(e) => setAdDetails(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Summer Sale 2024"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  fontSize: '15px',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8A2BE2';
                  e.target.style.boxShadow = '0 0 0 3px rgba(138, 43, 226, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{ color: '#fff', fontSize: '16px', marginBottom: '10px', display: 'block', fontWeight: '500' }}>
                Description (Optional)
              </label>
              <input
                type="text"
                value={adDetails.description}
                onChange={(e) => setAdDetails(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of your campaign"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  fontSize: '15px',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8A2BE2';
                  e.target.style.boxShadow = '0 0 0 3px rgba(138, 43, 226, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Enhanced File Upload */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ color: '#fff', fontSize: '16px', marginBottom: '12px', display: 'block', fontWeight: '500' }}>
              Upload Ad Creative (Images/Videos)
            </label>
            <div 
              className="upload-area" 
              onClick={() => document.getElementById('fileInput').click()}
              style={{
                border: '2px dashed rgba(138, 43, 226, 0.5)',
                borderRadius: '12px',
                padding: '40px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'rgba(138, 43, 226, 0.05)',
                transition: 'all 0.3s ease',
                marginBottom: '20px'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#8A2BE2';
                e.target.style.background = 'rgba(138, 43, 226, 0.1)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(138, 43, 226, 0.5)';
                e.target.style.background = 'rgba(138, 43, 226, 0.05)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <FaCloudUploadAlt size={32} color="#8A2BE2" style={{ marginBottom: '12px' }} />
              <div style={{ color: '#fff', fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
                Click to upload or drag and drop your files here
              </div>
              <div style={{ color: '#ccc', fontSize: '14px' }}>
                Supports images (JPG, PNG) and videos (MP4, MOV) up to 50MB
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
              <div>
                <h5 style={{ color: '#fff', fontSize: '16px', marginBottom: '15px', fontWeight: '500' }}>
                  Uploaded Files ({adDetails.uploadedFiles.length})
                </h5>
                <div style={{ display: 'grid', gap: '10px' }}>
                  {adDetails.uploadedFiles.map((file, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {file.type.startsWith('image/') ? 
                          <FaImage size={16} color="#8A2BE2" /> : 
                          <FaVideo size={16} color="#8A2BE2" />
                        }
                        <span style={{ color: '#fff', fontSize: '14px' }}>
                          {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
                        </span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        style={{
                          background: 'rgba(255, 59, 48, 0.2)',
                          border: '1px solid rgba(255, 59, 48, 0.3)',
                          color: '#ff3b30',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(255, 59, 48, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(255, 59, 48, 0.2)';
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Ad Preview */}
                {adDetails.uploadedFiles.length > 0 && (
                  <AdPreview 
                    file={adDetails.uploadedFiles[0].file}
                    adDetails={adDetails}
                    selectedPlan={selectedPlan}
                    targetRegion={advertiserData?.region}
                  />
                )}
              </div>
            )}
          </div>

          {/* Enhanced Pricing Cards */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '20px', fontWeight: '600' }}>
              Choose Your Campaign Plan
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  style={{
                    padding: '25px',
                    borderRadius: '16px',
                    border: selectedPlan === plan.id 
                      ? '2px solid rgba(255, 255, 255, 0.3)' 
                      : '1px solid rgba(255, 255, 255, 0.15)',
                    background: selectedPlan === plan.id 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    boxShadow: selectedPlan === plan.id 
                      ? '0 8px 32px rgba(255, 255, 255, 0.1)' 
                      : '0 8px 25px rgba(0, 0, 0, 0.2)',
                    transform: selectedPlan === plan.id ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedPlan !== plan.id) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.target.style.transform = 'translateY(-3px) scale(1.01)';
                      e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPlan !== plan.id) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                    }
                  }}
                >
                  {plan.popular && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      color: '#fff',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                    }}>
                      <FaCrown size={12} />
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#fff', fontSize: '20px', margin: '0 0 8px 0', fontWeight: '600' }}>
                      {plan.name}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ color: '#8A2BE2', fontSize: '28px', fontWeight: '700' }}>
                        SAR {plan.price.toLocaleString()}
                      </span>
                      <span style={{ color: '#ccc', fontSize: '14px' }}>
                        / {plan.duration}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {plan.features.map((feature, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <FaCheck size={14} color="#27ae60" />
                        <span style={{ color: '#eee', fontSize: '14px' }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {selectedPlan === plan.id && (
                    <div style={{
                      marginTop: '15px',
                      padding: '10px',
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      borderRadius: '8px',
                      textAlign: 'center',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      ✓ Selected Plan
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Start Campaign Button */}
          <button
            onClick={handleStartCampaign}
            disabled={!adDetails.title.trim()}
            style={{
              width: '100%',
              padding: '18px 24px',
              background: adDetails.title.trim() 
                ? 'rgba(255, 255, 255, 0.15)' 
                : 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: adDetails.title.trim() 
                ? '1px solid rgba(255, 255, 255, 0.3)' 
                : '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: adDetails.title.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'all 0.3s ease',
              boxShadow: adDetails.title.trim() 
                ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
                : 'none'
            }}
            onMouseEnter={(e) => {
              if (adDetails.title.trim()) {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (adDetails.title.trim()) {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
              }
            }}
          >
            <FaRocket size={18} />
            Start Campaign & Proceed to Payment
          </button>
        </div>

        {/* Analytics and Status Sections */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '25px' 
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '16px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(15px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
          }}>
            <FaChartLine size={32} color="#8A2BE2" style={{ marginBottom: '15px' }} />
            <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '12px', fontWeight: '600' }}>
              Campaign Analytics
            </h3>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
              Track your campaign performance, impressions, and engagement metrics in real-time.
            </p>
            <div style={{ 
              padding: '20px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{ fontSize: '13px', color: '#ccc', margin: 0 }}>
                Analytics will be available once your campaign is live
              </p>
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '16px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(15px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
          }}>
            <FaFileInvoice size={32} color="#8A2BE2" style={{ marginBottom: '15px' }} />
            <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '12px', fontWeight: '600' }}>
              Invoice & Status
            </h3>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6', marginBottom: '15px' }}>
              Track your billing, payment status, and campaign performance metrics in real-time.
            </p>
            <div style={{ 
              padding: '20px', 
              background: 'rgba(255, 255, 255, 0.05)', 
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{ fontSize: '13px', color: '#ccc', margin: 0 }}>
                No active campaigns yet. Start your first campaign to see invoices and status updates.
              </p>
            </div>
          </div>
        </div>

        {/* Ad Library Section */}
        <div style={{ marginTop: '40px' }}>
          <AdLibrary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 