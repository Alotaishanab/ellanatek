import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaClock, FaMapMarkerAlt, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';
import '../../styles/OnboardingFlow.css';

const Success = () => {
  const navigate = useNavigate();
  const [successData, setSuccessData] = useState(null);

  useEffect(() => {
    // Load success data from localStorage
    const data = localStorage.getItem('paymentSuccess');
    if (data) {
      setSuccessData(JSON.parse(data));
    } else {
      // Redirect to dashboard if no payment data
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateCampaignEndDate = (startDate, planId) => {
    const plan = getPlanDetails(planId);
    const start = new Date(startDate);
    const durationDays = parseInt(plan.duration.split(' ')[0]);
    const endDate = new Date(start.getTime() + (durationDays * 24 * 60 * 60 * 1000));
    return endDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadReceipt = () => {
    // Mock download functionality
    const receiptData = {
      billingId: successData.payment.billingId,
      businessName: successData.advertiserData.businessName,
      campaign: getPlanDetails(successData.selectedPlan),
      amount: successData.payment.amount,
      vat: Math.round(successData.payment.amount * 0.15),
      total: Math.round(successData.payment.amount * 1.15),
      paymentDate: formatDate(successData.payment.timestamp),
      status: 'Paid'
    };

    // In a real app, this would generate and download a PDF
    console.log('Receipt data:', receiptData);
    alert('Receipt downloaded successfully!');
  };

  const handleBackToDashboard = () => {
    // Clear payment data
    localStorage.removeItem('paymentSuccess');
    localStorage.removeItem('campaignData');
    navigate('/advertise-with-us/dashboard');
  };

  if (!successData) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1a0a25, #0e051b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#fff' }}>Loading...</div>
      </div>
    );
  }

  const planDetails = getPlanDetails(successData.selectedPlan);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a0a25, #0e051b)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Success Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '40px',
          padding: '30px',
          background: 'rgba(39, 174, 96, 0.1)',
          borderRadius: '16px',
          border: '2px solid rgba(39, 174, 96, 0.3)'
        }}>
          <FaCheckCircle size={64} color="#27ae60" style={{ marginBottom: '20px' }} />
          <h1 style={{ color: '#27ae60', fontSize: '32px', marginBottom: '10px' }}>
            Payment Successful!
          </h1>
          <p style={{ color: '#fff', fontSize: '18px', marginBottom: '15px' }}>
            Your advertising campaign has been scheduled successfully.
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(39, 174, 96, 0.2)',
            borderRadius: '20px',
            border: '1px solid rgba(39, 174, 96, 0.4)'
          }}>
            <FaClock size={16} color="#27ae60" />
            <span style={{ color: '#27ae60', fontSize: '14px', fontWeight: '600' }}>
              Status: Scheduled
            </span>
          </div>
        </div>

        {/* Campaign Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          
          {/* Campaign Details */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ color: '#8A2BE2', fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaMapMarkerAlt size={20} />
              Campaign Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Business Name</span>
                <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                  {successData.advertiserData.businessName}
                </div>
              </div>
              <div>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Ad Title</span>
                <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                  {successData.adDetails.title}
                </div>
              </div>
              <div>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Target Region</span>
                <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                  {successData.advertiserData.region}
                </div>
              </div>
              <div>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Target Audience</span>
                <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                  {successData.adDetails.targetGender.join(', ')} • {successData.adDetails.targetAge.join(', ')}
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Schedule */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '12px',
            padding: '25px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ color: '#8A2BE2', fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaCalendarAlt size={20} />
              Campaign Schedule
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Campaign Type</span>
                <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                  {planDetails.name}
                </div>
              </div>
              <div>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Duration</span>
                <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                  {planDetails.duration}
                </div>
              </div>
              <div>
                <span style={{ color: '#ccc', fontSize: '14px' }}>Start Date</span>
                <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                  {formatDate(successData.payment.timestamp)}
                </div>
              </div>
              <div>
                <span style={{ color: '#ccc', fontSize: '14px' }}>End Date</span>
                <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                  {calculateCampaignEndDate(successData.payment.timestamp, successData.selectedPlan)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: '12px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#8A2BE2', fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaCreditCard size={20} />
            Billing Information
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Billing ID</span>
              <div style={{ 
                color: '#8A2BE2', 
                fontSize: '18px', 
                fontWeight: '700',
                fontFamily: 'monospace',
                padding: '8px 12px',
                background: 'rgba(138, 43, 226, 0.1)',
                borderRadius: '6px',
                border: '1px solid rgba(138, 43, 226, 0.3)'
              }}>
                {successData.payment.billingId}
              </div>
            </div>
            <div>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Payment Method</span>
              <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                •••• •••• •••• {successData.payment.cardNumber.slice(-4)}
              </div>
            </div>
            <div>
              <span style={{ color: '#ccc', fontSize: '14px' }}>Payment Date</span>
              <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>
                {formatDate(successData.payment.timestamp)}
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div style={{
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '15px' }}>Payment Breakdown</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ccc', fontSize: '14px' }}>{planDetails.name}</span>
                <span style={{ color: '#fff', fontSize: '14px' }}>SAR {planDetails.price.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ccc', fontSize: '14px' }}>VAT (15%)</span>
                <span style={{ color: '#fff', fontSize: '14px' }}>SAR {Math.round(planDetails.price * 0.15).toLocaleString()}</span>
              </div>
              <hr style={{ border: '1px solid rgba(255, 255, 255, 0.1)', margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>Total Paid</span>
                <span style={{ color: '#27ae60', fontSize: '18px', fontWeight: '700' }}>
                  SAR {Math.round(planDetails.price * 1.15).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.06)',
          borderRadius: '12px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#8A2BE2', fontSize: '18px', marginBottom: '15px' }}>What happens next?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#27ae60',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: '600' }}>1</span>
              </div>
              <span style={{ color: '#fff', fontSize: '14px' }}>
                Your ad will be deployed to AdBoxes in {successData.advertiserData.region} within 24 hours
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#8A2BE2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: '600' }}>2</span>
              </div>
              <span style={{ color: '#fff', fontSize: '14px' }}>
                You'll receive real-time analytics and performance reports via email
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#f39c12',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: '600' }}>3</span>
              </div>
              <span style={{ color: '#fff', fontSize: '14px' }}>
                Monitor your campaign performance through the dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={handleDownloadReceipt}
            style={{
              background: 'transparent',
              color: '#8A2BE2',
              border: '2px solid #8A2BE2',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(138, 43, 226, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            <FaDownload size={16} />
            Download Receipt
          </button>
          
          <button
            onClick={handleBackToDashboard}
            style={{
              background: '#8A2BE2',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#9d3bf0';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#8A2BE2';
            }}
          >
            Back to Dashboard
          </button>
        </div>

        {/* Support Notice */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          padding: '20px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.5' }}>
            Need help or have questions about your campaign? 
            <br />
            Contact our support team at <span style={{ color: '#8A2BE2' }}>support@ellanatek.com</span> or call <span style={{ color: '#8A2BE2' }}>+966 123 456 789</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success; 