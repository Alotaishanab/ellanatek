import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaExpand, FaEye, FaChartLine, FaClock } from 'react-icons/fa';

const AdPreview = ({ file, adDetails, selectedPlan, targetRegion }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    // Calculate predictions based on plan and region
    calculatePredictions();
  }, [selectedPlan, targetRegion]);

  const calculatePredictions = () => {
    const basePredictions = {
      '1week': { dailyViews: 1200, totalImpressions: 8400, engagement: 2.3 },
      '2weeks': { dailyViews: 1800, totalImpressions: 25200, engagement: 3.1 },
      '1month': { dailyViews: 2200, totalImpressions: 66000, engagement: 3.8 }
    };

    const regionMultiplier = {
      'khobar': 1.0,
      'dammam': 1.2,
      'dhahran': 0.9,
      'jubail': 0.8,
      'eastern-province': 1.5
    };

    const base = basePredictions[selectedPlan] || basePredictions['2weeks'];
    const multiplier = regionMultiplier[targetRegion] || 1.0;

    setPredictions({
      dailyViews: Math.round(base.dailyViews * multiplier),
      totalImpressions: Math.round(base.totalImpressions * multiplier),
      engagement: (base.engagement * multiplier).toFixed(1),
      reach: Math.round(base.totalImpressions * 0.7 * multiplier),
      ctr: ((base.engagement * multiplier) / 100).toFixed(2)
    });
  };

  const isVideo = file?.type?.startsWith('video/');
  const isImage = file?.type?.startsWith('image/');

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(138, 43, 226, 0.3)',
      marginTop: '20px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <FaEye size={20} color="#8A2BE2" />
        <h3 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>
          Ad Preview & Predictions
        </h3>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Ad Preview */}
        <div>
          <h4 style={{ color: '#8A2BE2', marginBottom: '12px', fontSize: '14px' }}>
            How it will appear on AdBox
          </h4>
          <div style={{
            background: '#000',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            aspectRatio: '9/16', // Mobile aspect ratio
            maxHeight: '300px',
            border: '3px solid #333'
          }}>
            {isImage && (
              <img
                src={URL.createObjectURL(file)}
                alt="Ad Preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            )}
            {isVideo && (
              <video
                src={URL.createObjectURL(file)}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                autoPlay={isPlaying}
                loop
                muted
              />
            )}
            
            {/* Overlay controls for video */}
            {isVideo && (
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                display: 'flex',
                gap: '8px'
              }}>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#fff'
                  }}
                >
                  {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
                </button>
              </div>
            )}

            {/* Ad info overlay */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              right: '10px',
              background: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '8px',
              padding: '8px 12px'
            }}>
              <div style={{ color: '#fff', fontSize: '12px', fontWeight: '600' }}>
                {adDetails.title || 'Your Campaign Title'}
              </div>
              <div style={{ color: '#ccc', fontSize: '10px', marginTop: '2px' }}>
                {adDetails.description || 'Campaign description will appear here'}
              </div>
            </div>
          </div>
        </div>

        {/* Predictions */}
        <div>
          <h4 style={{ color: '#8A2BE2', marginBottom: '16px', fontSize: '14px' }}>
            Performance Predictions
          </h4>
          
          {predictions && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                padding: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}>
                  <FaEye size={14} color="#8A2BE2" />
                  <span style={{ color: '#8A2BE2', fontSize: '12px', fontWeight: '600' }}>
                    Daily Views
                  </span>
                </div>
                <div style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>
                  {predictions.dailyViews.toLocaleString()}
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                padding: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}>
                  <FaChartLine size={14} color="#8A2BE2" />
                  <span style={{ color: '#8A2BE2', fontSize: '12px', fontWeight: '600' }}>
                    Total Impressions
                  </span>
                </div>
                <div style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>
                  {predictions.totalImpressions.toLocaleString()}
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                padding: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}>
                  <FaClock size={14} color="#8A2BE2" />
                  <span style={{ color: '#8A2BE2', fontSize: '12px', fontWeight: '600' }}>
                    Estimated Reach
                  </span>
                </div>
                <div style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>
                  {predictions.reach.toLocaleString()}
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                padding: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px'
                }}>
                  <FaChartLine size={14} color="#8A2BE2" />
                  <span style={{ color: '#8A2BE2', fontSize: '12px', fontWeight: '600' }}>
                    Engagement Rate
                  </span>
                </div>
                <div style={{ color: '#fff', fontSize: '18px', fontWeight: '700' }}>
                  {predictions.engagement}%
                </div>
              </div>
            </div>
          )}

          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: 'rgba(138, 43, 226, 0.1)',
            borderRadius: '8px',
            border: '1px solid rgba(138, 43, 226, 0.3)'
          }}>
            <div style={{ color: '#8A2BE2', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
              💡 Optimization Tip
            </div>
            <div style={{ color: '#fff', fontSize: '11px', lineHeight: '1.4' }}>
              {isVideo 
                ? 'Video ads typically get 40% higher engagement than static images'
                : 'Consider adding motion graphics to increase engagement by up to 40%'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPreview; 