import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaUpload, FaCreditCard, FaHistory, FaSignOutAlt, FaEye, FaEdit, FaTrash, FaPlay, FaPause } from 'react-icons/fa';
import ellantekAPI from '../api';
import '../../styles/OnboardingFlow.css';

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load user data on mount
  useEffect(() => {
    const userData = localStorage.getItem('ellanatek_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else if (!ellantekAPI.isAuthenticated()) {
      navigate('/advertise-with-us');
    }
    
    // Load user's ads
    loadUserAds();
  }, [navigate]);

  const loadUserAds = async () => {
    setLoading(true);
    try {
      const response = await ellantekAPI.getAds();
      setAds(response.ads || response);
    } catch (error) {
      setError('Failed to load ads');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await ellantekAPI.logout();
    localStorage.removeItem('ellanatek_user');
    navigate('/advertise-with-us');
  };

  const handleUploadAd = () => {
    navigate('/advertise-with-us/upload');
  };

  const handleToggleAd = async (adId) => {
    try {
      await ellantekAPI.toggleAdActive(adId);
      loadUserAds(); // Refresh ads
    } catch (error) {
      setError('Failed to toggle ad status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#28a745';
      case 'rejected': return '#dc3545';
      case 'pending': return '#ffc107';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'pending': return 'Pending Review';
      default: return 'Unknown';
    }
  };

  const ProfileTab = () => (
    <div className="account-section">
      <h3><FaUser /> Profile Information</h3>
      {user && (
        <div className="profile-info">
          <div className="info-row">
            <label>Name:</label>
            <span>{user.firstName} {user.lastName}</span>
          </div>
          <div className="info-row">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div className="info-row">
            <label>Phone:</label>
            <span>{user.phone}</span>
          </div>
          <div className="info-row">
            <label>Account Type:</label>
            <span>Advertiser</span>
          </div>
          <button className="edit-button">
            <FaEdit /> Edit Profile
          </button>
        </div>
      )}
    </div>
  );

  const AdsTab = () => (
    <div className="account-section">
      <div className="section-header">
        <h3><FaUpload /> My Advertisements</h3>
        <button className="upload-button" onClick={handleUploadAd}>
          <FaUpload /> Upload New Ad
        </button>
      </div>
      
      {loading ? (
        <div className="loading">Loading your ads...</div>
      ) : ads.length === 0 ? (
        <div className="empty-state">
          <p>You haven't uploaded any ads yet.</p>
          <button className="upload-button" onClick={handleUploadAd}>
            <FaUpload /> Upload Your First Ad
          </button>
        </div>
      ) : (
        <div className="ads-grid">
          {ads.map(ad => (
            <div key={ad.id} className="ad-card">
              <div className="ad-thumbnail">
                {ad.thumbnail ? (
                  <img src={ad.thumbnail} alt={ad.title} />
                ) : (
                  <div className="placeholder-thumbnail">No Image</div>
                )}
              </div>
              <div className="ad-details">
                <h4>{ad.title}</h4>
                <p className="ad-description">{ad.description}</p>
                <div className="ad-status" style={{color: getStatusColor(ad.status)}}>
                  {getStatusText(ad.status)}
                </div>
                <div className="ad-actions">
                  <button className="action-btn view" title="View Details">
                    <FaEye />
                  </button>
                  {ad.status === 'approved' && (
                    <button 
                      className={`action-btn ${ad.active ? 'pause' : 'play'}`}
                      onClick={() => handleToggleAd(ad.id)}
                      title={ad.active ? 'Pause Ad' : 'Activate Ad'}
                    >
                      {ad.active ? <FaPause /> : <FaPlay />}
                    </button>
                  )}
                  <button className="action-btn edit" title="Edit Ad">
                    <FaEdit />
                  </button>
                  <button className="action-btn delete" title="Delete Ad">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const PaymentsTab = () => (
    <div className="account-section">
      <h3><FaCreditCard /> Payment Methods & Billing</h3>
      <div className="payment-info">
        <div className="payment-card">
          <h4>Default Payment Method</h4>
          <p>**** **** **** 1234</p>
          <p>Expires: 12/25</p>
          <button className="edit-button">Update Payment Method</button>
        </div>
        <div className="billing-history">
          <h4>Recent Transactions</h4>
          <div className="transaction-item">
            <span>Ad Campaign - January 2025</span>
            <span>$50.00</span>
          </div>
          <div className="transaction-item">
            <span>Ad Campaign - December 2024</span>
            <span>$75.00</span>
          </div>
        </div>
      </div>
    </div>
  );

  const HistoryTab = () => (
    <div className="account-section">
      <h3><FaHistory /> Campaign History</h3>
      <div className="history-list">
        <div className="history-item">
          <div className="history-details">
            <h4>Summer Sale Campaign</h4>
            <p>Duration: June 1-30, 2024</p>
            <p>Impressions: 15,420</p>
            <p>Status: Completed</p>
          </div>
          <div className="history-actions">
            <button className="view-report-btn">View Report</button>
          </div>
        </div>
        <div className="history-item">
          <div className="history-details">
            <h4>Black Friday Promo</h4>
            <p>Duration: November 20-30, 2024</p>
            <p>Impressions: 22,100</p>
            <p>Status: Completed</p>
          </div>
          <div className="history-actions">
            <button className="view-report-btn">View Report</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="account-container">
      <div className="account-header">
        <h1>My Account</h1>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {error && (
        <div className="error-message" style={{
          background: '#fee', 
          color: '#c33', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <div className="account-content">
        <div className="account-sidebar">
          <nav className="account-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FaUser /> Profile
            </button>
            <button 
              className={`nav-item ${activeTab === 'ads' ? 'active' : ''}`}
              onClick={() => setActiveTab('ads')}
            >
              <FaUpload /> My Ads
            </button>
            <button 
              className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              <FaCreditCard /> Payments
            </button>
            <button 
              className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <FaHistory /> History
            </button>
          </nav>
        </div>

        <div className="account-main">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'ads' && <AdsTab />}
          {activeTab === 'payments' && <PaymentsTab />}
          {activeTab === 'history' && <HistoryTab />}
        </div>
      </div>

      <style jsx>{`
        .account-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .account-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 1px solid #eee;
          padding-bottom: 20px;
        }

        .logout-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #dc3545;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }

        .account-content {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 30px;
        }

        .account-sidebar {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          height: fit-content;
        }

        .account-nav {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 15px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          border-radius: 5px;
          transition: background 0.2s;
        }

        .nav-item:hover {
          background: #e9ecef;
        }

        .nav-item.active {
          background: #007bff;
          color: white;
        }

        .account-section {
          background: white;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .upload-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #28a745;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }

        .profile-info .info-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }

        .profile-info label {
          font-weight: bold;
          color: #666;
        }

        .edit-button {
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }

        .ads-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .ad-card {
          border: 1px solid #ddd;
          border-radius: 10px;
          overflow: hidden;
          background: white;
        }

        .ad-thumbnail {
          height: 150px;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ad-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .placeholder-thumbnail {
          color: #666;
        }

        .ad-details {
          padding: 15px;
        }

        .ad-details h4 {
          margin: 0 0 10px 0;
        }

        .ad-description {
          color: #666;
          font-size: 14px;
          margin: 0 0 10px 0;
        }

        .ad-status {
          font-weight: bold;
          margin-bottom: 15px;
        }

        .ad-actions {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          background: none;
          border: 1px solid #ddd;
          padding: 8px;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn.view { color: #007bff; }
        .action-btn.play { color: #28a745; }
        .action-btn.pause { color: #ffc107; }
        .action-btn.edit { color: #6c757d; }
        .action-btn.delete { color: #dc3545; }

        .empty-state {
          text-align: center;
          padding: 40px;
          color: #666;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: #666;
        }

        .payment-card, .billing-history {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .transaction-item, .history-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #eee;
        }

        .view-report-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .account-content {
            grid-template-columns: 1fr;
          }
          
          .ads-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Account;