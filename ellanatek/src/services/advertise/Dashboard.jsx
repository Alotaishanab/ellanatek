import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaChartLine, FaFileInvoice, FaMapMarkedAlt, FaRocket } from 'react-icons/fa';
import MapPreview from '../../components/MapPreview';
import PricingCards from '../../components/PricingCards';
import '../../styles/OnboardingFlow.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [advertiserData, setAdvertiserData] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('2weeks');
  const [adDetails, setAdDetails] = useState({
    title: '',
    description: '',
    uploadedFiles: []
  });

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
      advertiserData,
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a0a25, #0e051b)',
      padding: '20px',
      paddingBottom: '120px' // Space for bottom navigation
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div className="dashboard-welcome">
          <h1>Welcome back, {advertiserData?.businessName || 'Advertiser'}!</h1>
          <p>Your advertising journey starts here. Create your campaign and start reaching your audience.</p>
        </div>

        {advertiserData && (
          <>
            <div className="dashboard-summary">
              <h3>Your Business Profile</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
                <div>
                  <strong>Industry:</strong> {getIndustryLabel(advertiserData.industryType)}
                </div>
                <div>
                  <strong>Budget:</strong> {getBudgetLabel(advertiserData.budgetRange)}
                </div>
                <div>
                  <strong>Target Region:</strong> {getRegionLabel(advertiserData.region)}
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

        <div className="dashboard-sections">
          <div className="dashboard-section">
            <FaChartLine size={32} color="#8A2BE2" />
            <h3>Campaign Analytics</h3>
            <p>Track your campaign performance, impressions, and engagement metrics in real-time.</p>
            <div style={{ marginTop: '15px', padding: '20px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
              <p style={{ fontSize: '12px', color: '#ccc' }}>Analytics will be available once your campaign is live</p>
            </div>
          </div>

          <div className="dashboard-section">
            <FaFileInvoice size={32} color="#8A2BE2" />
            <h3>Invoice & Status</h3>
            <p>Track your billing, payment status, and campaign performance metrics in real-time.</p>
            <div style={{ marginTop: '15px', padding: '20px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
              <p style={{ fontSize: '12px', color: '#ccc' }}>No active campaigns yet. Start your first campaign to see invoices and status updates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 