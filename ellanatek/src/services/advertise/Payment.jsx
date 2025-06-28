import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaLock, FaSpinner } from 'react-icons/fa';
import '../../styles/OnboardingFlow.css';

const Payment = () => {
  const navigate = useNavigate();
  const [campaignData, setCampaignData] = useState(null);
  const [paymentStep, setPaymentStep] = useState('details'); // details, processing, success
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    billingAddress: {
      country: 'SA',
      city: '',
      postalCode: ''
    }
  });


  useEffect(() => {
    // Load campaign data from localStorage
    const data = localStorage.getItem('campaignData');
    if (data) {
      setCampaignData(JSON.parse(data));
    } else {
      // Redirect back to dashboard if no campaign data
      navigate('/advertise-with-us/dashboard');
    }
  }, [navigate]);

  const getPlanDetails = (planId) => {
    const plans = {
      '1week': { name: '1 Week Campaign', price: 1900, duration: '7 days' },
      '2weeks': { name: '2 Weeks Campaign', price: 3500, duration: '14 days' },
      '1month': { name: '1 Month Campaign', price: 6500, duration: '30 days' }
    };
    return plans[planId] || plans['2weeks'];
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setPaymentData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setPaymentData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      handleInputChange('cardNumber', formatted);
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      handleInputChange('expiryDate', formatted);
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 4) {
      handleInputChange('cvv', value);
    }
  };

  const validateForm = () => {
    const { cardNumber, expiryDate, cvv, cardName, email } = paymentData;
    return (
      cardNumber.replace(/\s/g, '').length === 16 &&
      expiryDate.length === 5 &&
      cvv.length >= 3 &&
      cardName.trim() &&
      email.includes('@')
    );
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    setPaymentStep('processing');

    // Simulate Stripe payment processing
    setTimeout(() => {
      // Generate mock billing ID
      const billingId = 'ADM-' + Date.now().toString().slice(-8);
      
      // Store success data
      const successData = {
        ...campaignData,
        payment: {
          ...paymentData,
          billingId,
          amount: getPlanDetails(campaignData.selectedPlan).price,
          timestamp: new Date().toISOString(),
          status: 'completed'
        }
      };
      
      localStorage.setItem('paymentSuccess', JSON.stringify(successData));
      navigate('/advertise-with-us/success');
    }, 3000);
  };

  if (!campaignData) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1a0a25, #0e051b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <FaSpinner size={32} color="#8A2BE2" className="fa-spin" />
      </div>
    );
  }

  const planDetails = getPlanDetails(campaignData.selectedPlan);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a0a25, #0e051b)',
      padding: '20px'
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .fa-spin {
            animation: spin 1s linear infinite;
          }
        `}
      </style>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ color: '#fff', fontSize: '28px', marginBottom: '10px' }}>
            Complete Your Payment
          </h1>
          <p style={{ color: '#ccc', fontSize: '16px' }}>
            Secure payment powered by Stripe • SSL encrypted
          </p>
        </div>

        {paymentStep === 'details' && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 400px',
            gap: '30px'
          }}>
            {/* Payment Form */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '12px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
                <FaCreditCard size={20} color="#8A2BE2" />
                <h2 style={{ color: '#fff', fontSize: '20px', margin: 0 }}>Payment Details</h2>
                <FaLock size={16} color="#27ae60" style={{ marginLeft: 'auto' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={paymentData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
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
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={paymentData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      fontSize: '14px',
                      letterSpacing: '1px'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={paymentData.expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
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
                      CVV
                    </label>
                    <input
                      type="text"
                      value={paymentData.cvv}
                      onChange={handleCvvChange}
                      placeholder="123"
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

                <div>
                  <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={paymentData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    placeholder="John Doe"
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>
                      City
                    </label>
                    <input
                      type="text"
                      value={paymentData.billingAddress.city}
                      onChange={(e) => handleInputChange('billingAddress.city', e.target.value)}
                      placeholder="Khobar"
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
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={paymentData.billingAddress.postalCode}
                      onChange={(e) => handleInputChange('billingAddress.postalCode', e.target.value)}
                      placeholder="12345"
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

                <button
                  onClick={handlePayment}
                  disabled={!validateForm()}
                  style={{
                    background: validateForm() ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    color: '#fff',
                    border: validateForm() ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '16px 24px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: validateForm() ? 'pointer' : 'not-allowed',
                    marginTop: '20px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: validateForm() ? '0 8px 32px rgba(0, 0, 0, 0.3)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (validateForm()) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (validateForm()) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                    }
                  }}
                >
                  <FaLock size={16} />
                  Pay SAR {planDetails.price.toLocaleString()}
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '12px',
              padding: '25px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              height: 'fit-content'
            }}>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '20px' }}>Order Summary</h3>
              
              {/* Campaign Preview */}
              <div style={{
                padding: '15px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <h4 style={{ color: '#8A2BE2', fontSize: '14px', marginBottom: '10px' }}>Campaign Details</h4>
                <div style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.5' }}>
                  <div><strong style={{ color: '#fff' }}>Business:</strong> {campaignData.advertiserData?.businessName}</div>
                  <div><strong style={{ color: '#fff' }}>Ad Title:</strong> {campaignData.adDetails?.title}</div>
                  <div><strong style={{ color: '#fff' }}>Region:</strong> {campaignData.advertiserData?.region}</div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#ccc', fontSize: '14px' }}>{planDetails.name}</span>
                  <span style={{ color: '#fff', fontSize: '14px' }}>SAR {planDetails.price.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#ccc', fontSize: '14px' }}>Duration</span>
                  <span style={{ color: '#fff', fontSize: '14px' }}>{planDetails.duration}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#ccc', fontSize: '14px' }}>VAT (15%)</span>
                  <span style={{ color: '#fff', fontSize: '14px' }}>SAR {Math.round(planDetails.price * 0.15).toLocaleString()}</span>
                </div>
                <hr style={{ border: '1px solid rgba(255, 255, 255, 0.1)', margin: '10px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>Total</span>
                  <span style={{ color: '#8A2BE2', fontSize: '18px', fontWeight: '700' }}>
                    SAR {Math.round(planDetails.price * 1.15).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Security Notice */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                background: 'rgba(39, 174, 96, 0.1)',
                borderRadius: '6px',
                border: '1px solid rgba(39, 174, 96, 0.3)'
              }}>
                <FaLock size={14} color="#27ae60" />
                <span style={{ color: '#27ae60', fontSize: '12px' }}>
                  Secured by Stripe SSL encryption
                </span>
              </div>
            </div>
          </div>
        )}

        {paymentStep === 'processing' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            textAlign: 'center'
          }}>
            <FaSpinner size={48} color="#8A2BE2" className="fa-spin" style={{ marginBottom: '20px' }} />
            <h2 style={{ color: '#fff', fontSize: '24px', marginBottom: '10px' }}>Processing Payment...</h2>
            <p style={{ color: '#ccc', fontSize: '16px' }}>
              Please wait while we securely process your payment.
            </p>
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: 'rgba(243, 156, 18, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(243, 156, 18, 0.3)'
            }}>
              <span style={{ color: '#f39c12', fontSize: '14px' }}>
                Do not close this window or refresh the page
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment; 