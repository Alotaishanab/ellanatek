import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaBuilding, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaSignOutAlt,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaShieldAlt
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/OnboardingFlow.css';

const Account = () => {
  const navigate = useNavigate();
  const { user, advertiserData, updateUserData, updateAdvertiserData, logout } = useAuth();
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    industryType: '',
    region: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load user data from context
    if (user && advertiserData) {
      setUserInfo({
        ...user,
        ...advertiserData
      });
    } else if (user) {
      setUserInfo({
        ...user,
        businessName: '',
        industryType: '',
        region: ''
      });
    }
  }, [user, advertiserData]);

  const handleEdit = () => {
    setEditData({ ...userInfo });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData({});
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update context with new data
      const userData = {
        firstName: editData.firstName,
        lastName: editData.lastName,
        email: editData.email,
        phone: editData.phone
      };
      
      const newAdvertiserData = {
        businessName: editData.businessName,
        industryType: editData.industryType,
        region: editData.region
      };

      updateUserData(userData);
      updateAdvertiserData(newAdvertiserData);
      
      setUserInfo({ ...editData });
      setIsEditing(false);
      setIsLoading(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowChangePassword(false);
      alert('Password changed successfully!');
    }, 1000);
  };

  const handleLogout = () => {
    // Use context logout function
    logout();
    
    // Navigate to login
    navigate('/advertise-with-us/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
      paddingBottom: '140px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: '700', 
              marginBottom: '8px',
              color: '#fff'
            }}>
              Account Settings
            </h1>
            <p style={{ 
              fontSize: '16px', 
              opacity: 0.8,
              color: '#ccc',
              margin: 0
            }}>
              Manage your profile and account preferences
            </p>
          </div>
          
          <button
            onClick={() => navigate('/advertise-with-us/dashboard')}
            style={{
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
            Back to Dashboard
          </button>
        </div>

        {/* Account Information Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '30px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          marginBottom: '30px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px'
          }}>
            <h2 style={{ 
              color: '#fff', 
              fontSize: '24px', 
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <FaUser size={24} color="#8A2BE2" />
              Profile Information
            </h2>
            
            {!isEditing ? (
              <button
                onClick={handleEdit}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <FaEdit size={14} />
                Edit
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  style={{
                    background: 'rgba(39, 174, 96, 0.2)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(39, 174, 96, 0.3)',
                    color: '#27ae60',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <FaSave size={14} />
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    background: 'rgba(231, 76, 60, 0.2)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(231, 76, 60, 0.3)',
                    color: '#e74c3c',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <FaTimes size={14} />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Fields */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {/* Personal Information */}
            <div>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '15px' }}>
                Personal Information
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '5px', display: 'block' }}>
                    First Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={editData.firstName || ''}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <div style={{
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px'
                    }}>
                      {userInfo.firstName || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '5px', display: 'block' }}>
                    Last Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={editData.lastName || ''}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <div style={{
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px'
                    }}>
                      {userInfo.lastName || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '5px', display: 'block' }}>
                    <FaEnvelope size={12} style={{ marginRight: '8px' }} />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email || ''}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <div style={{
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px'
                    }}>
                      {userInfo.email || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '5px', display: 'block' }}>
                    <FaPhone size={12} style={{ marginRight: '8px' }} />
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone || ''}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <div style={{
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px'
                    }}>
                      {userInfo.phone || 'Not provided'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '15px' }}>
                Business Information
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '5px', display: 'block' }}>
                    <FaBuilding size={12} style={{ marginRight: '8px' }} />
                    Business Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="businessName"
                      value={editData.businessName || ''}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                    />
                  ) : (
                    <div style={{
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px'
                    }}>
                      {userInfo.businessName || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '5px', display: 'block' }}>
                    Industry Type
                  </label>
                  {isEditing ? (
                    <select
                      name="industryType"
                      value={editData.industryType || ''}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Select Industry</option>
                      <option value="retail">Retail</option>
                      <option value="restaurant">Restaurant & Food</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="beauty">Beauty & Wellness</option>
                      <option value="technology">Technology</option>
                      <option value="automotive">Automotive</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="education">Education</option>
                      <option value="finance">Finance</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <div style={{
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px'
                    }}>
                      {getIndustryLabel(userInfo.industryType) || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '5px', display: 'block' }}>
                    Target Region
                  </label>
                  {isEditing ? (
                    <select
                      name="region"
                      value={editData.region || ''}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Select Region</option>
                      <option value="khobar">Khobar</option>
                      <option value="dammam">Dammam</option>
                      <option value="dhahran">Dhahran</option>
                      <option value="jubail">Jubail</option>
                      <option value="eastern-province">Eastern Province (All)</option>
                      <option value="riyadh">Riyadh</option>
                      <option value="jeddah">Jeddah</option>
                      <option value="makkah">Makkah</option>
                    </select>
                  ) : (
                    <div style={{
                      padding: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px'
                    }}>
                      {getRegionLabel(userInfo.region) || 'Not provided'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '30px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          marginBottom: '30px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ 
            color: '#fff', 
            fontSize: '24px', 
            margin: '0 0 25px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <FaShieldAlt size={24} color="#8A2BE2" />
            Security Settings
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <FaKey size={16} />
              Change Password
            </button>
          </div>

          {showChangePassword && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '5px', display: 'block' }}>
                    Current Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        paddingRight: '45px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#ccc',
                        cursor: 'pointer'
                      }}
                    >
                      {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '5px', display: 'block' }}>
                    New Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        paddingRight: '45px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#ccc',
                        cursor: 'pointer'
                      }}
                    >
                      {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ color: '#ccc', fontSize: '14px', marginBottom: '5px', display: 'block' }}>
                    Confirm New Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      style={{
                        width: '100%',
                        padding: '12px',
                        paddingRight: '45px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px'
                      }}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#ccc',
                        cursor: 'pointer'
                      }}
                    >
                      {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button
                    onClick={handleChangePassword}
                    disabled={isLoading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    style={{
                      background: 'rgba(39, 174, 96, 0.2)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(39, 174, 96, 0.3)',
                      color: '#27ae60',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </button>
                  <button
                    onClick={() => {
                      setShowChangePassword(false);
                      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    }}
                    style={{
                      background: 'rgba(231, 76, 60, 0.2)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(231, 76, 60, 0.3)',
                      color: '#e74c3c',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logout Section */}
        <div style={{
          background: 'rgba(231, 76, 60, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '30px',
          border: '1px solid rgba(231, 76, 60, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ 
            color: '#e74c3c', 
            fontSize: '24px', 
            margin: '0 0 15px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <FaSignOutAlt size={24} />
            Account Actions
          </h2>
          
          <p style={{ color: '#ccc', fontSize: '14px', marginBottom: '20px' }}>
            Sign out of your account. You'll need to log in again to access your dashboard.
          </p>
          
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(231, 76, 60, 0.2)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(231, 76, 60, 0.3)',
              color: '#e74c3c',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
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
            <FaSignOutAlt size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account; 