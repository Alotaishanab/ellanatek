import React from 'react';
import { FaCheck, FaCrown } from 'react-icons/fa';

const PricingCards = ({ selectedPlan, onPlanSelect }) => {
  const plans = [
    {
      id: '1week',
      name: '1 Week',
      price: 1900,
      duration: '7 days',
      features: ['4 AdBoxes', 'Basic Analytics', 'Email Support'],
      popular: false
    },
    {
      id: '2weeks',
      name: '2 Weeks',
      price: 3500,
      duration: '14 days',
      features: ['8 AdBoxes', 'Advanced Analytics', 'Priority Support', 'Campaign Optimization'],
      popular: true
    },
    {
      id: '1month',
      name: '1 Month',
      price: 6500,
      duration: '30 days',
      features: ['16 AdBoxes', 'Premium Analytics', '24/7 Support', 'A/B Testing', 'Dedicated Manager'],
      popular: false
    }
  ];

  return (
    <div style={{ marginTop: '25px' }}>
      <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '15px' }}>Choose Your Plan</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => onPlanSelect(plan.id)}
            style={{
              padding: '15px',
              borderRadius: '8px',
              border: selectedPlan === plan.id 
                ? '2px solid #8A2BE2' 
                : '1px solid rgba(255, 255, 255, 0.1)',
              background: selectedPlan === plan.id 
                ? 'rgba(138, 43, 226, 0.1)' 
                : 'rgba(255, 255, 255, 0.03)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (selectedPlan !== plan.id) {
                e.target.style.background = 'rgba(255, 255, 255, 0.06)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedPlan !== plan.id) {
                e.target.style.background = 'rgba(255, 255, 255, 0.03)';
              }
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '10px',
                background: '#8A2BE2',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <FaCrown size={10} />
                POPULAR
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <h5 style={{ color: '#fff', fontSize: '14px', margin: 0 }}>{plan.name}</h5>
                <span style={{ color: '#ccc', fontSize: '12px' }}>{plan.duration}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: '#8A2BE2', fontSize: '16px', fontWeight: '700' }}>
                  SAR {plan.price.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {plan.features.map((feature, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  color: '#ccc'
                }}>
                  <FaCheck size={10} color="#27ae60" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards; 