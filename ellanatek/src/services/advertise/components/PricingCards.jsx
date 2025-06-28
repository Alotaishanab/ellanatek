import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const PricingCards = ({ selectedPlan, onPlanSelect }) => {
  const plans = [
    {
      id: '1week',
      duration: '1 Week',
      price: '1,900',
      features: ['5-7 daily routes', 'Peak hours coverage', 'Basic analytics'],
      popular: false
    },
    {
      id: '2weeks',
      duration: '2 Weeks',
      price: '3,500',
      features: ['10-14 daily routes', 'Extended coverage', 'Advanced analytics', 'Priority support'],
      popular: true
    },
    {
      id: '1month',
      duration: '1 Month',
      price: '6,500',
      features: ['20+ daily routes', 'Full area coverage', 'Premium analytics', 'Dedicated account manager', 'Custom targeting'],
      popular: false
    }
  ];

  return (
    <div style={{ marginTop: '20px' }}>
      <h4 style={{ color: '#fff', marginBottom: '15px', fontSize: '16px' }}>Your Package Plan</h4>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '15px' 
      }}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => onPlanSelect(plan.id)}
            style={{
                          background: selectedPlan === plan.id 
              ? 'rgba(255, 255, 255, 0.2)' 
              : 'rgba(255, 255, 255, 0.05)',
            border: selectedPlan === plan.id 
              ? '2px solid rgba(255, 255, 255, 0.3)' 
              : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: selectedPlan === plan.id 
                ? '0 8px 32px rgba(255, 255, 255, 0.1)' 
                : '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (selectedPlan !== plan.id) {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedPlan !== plan.id) {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}>
                Most Popular
              </div>
            )}
            
            <div style={{ textAlign: 'center', marginBottom: '15px' }}>
              <h3 style={{ 
                color: '#fff', 
                fontSize: '18px', 
                fontWeight: '600', 
                margin: '0 0 8px 0' 
              }}>
                {plan.duration}
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                <span style={{ 
                  fontSize: '28px', 
                  fontWeight: '700', 
                  color: '#fff' 
                }}>
                  {plan.price}
                </span>
                <span style={{ 
                  fontSize: '14px', 
                  color: '#ccc', 
                  marginLeft: '4px' 
                }}>
                  SAR
                </span>
              </div>
            </div>

            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            }}>
              {plan.features.map((feature, index) => (
                <li key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '8px',
                  color: '#eee',
                  fontSize: '13px'
                }}>
                  <FaCheck 
                    size={12} 
                    color="#8A2BE2" 
                    style={{ marginRight: '8px', flexShrink: 0 }} 
                  />
                  {feature}
                </li>
              ))}
            </ul>

            {selectedPlan === plan.id && (
              <div style={{
                marginTop: '15px',
                padding: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#fff',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                ✓ Currently Selected
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCards; 