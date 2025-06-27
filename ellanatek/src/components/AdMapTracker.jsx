import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaClock } from 'react-icons/fa';

const AdMapTracker = ({ campaignData }) => {
  const getInitialAdBoxes = () => {
    const planBoxCount = {
      '1week': 4,
      '2weeks': 8,
      '1month': 16
    };

    const routes = [
      'Khobar - Dammam',
      'Dhahran - Jubail',
      'Dammam Center',
      'Khobar Corniche',
      'Jubail Industrial',
      'Dhahran Mall Area',
      'Dammam Corniche',
      'Khobar Downtown',
      'KFUPM Area',
      'Jubail Downtown',
      'Dammam Airport',
      'Half Moon Bay',
      'Aziziyah Beach',
      'King Fahd Causeway',
      'Dhahran Techno Valley',
      'Khobar Lakes'
    ];

    const boxCount = campaignData ? planBoxCount[campaignData.selectedPlan] : 4;
    
    return Array.from({ length: boxCount }, (_, i) => ({
      id: i + 1,
      x: 20 + (Math.random() * 60), // Random position between 20-80%
      y: 20 + (Math.random() * 60), // Random position between 20-80%
      status: i < boxCount/2 ? 'In Motion' : i < boxCount*0.75 ? 'Preparing' : 'Paused',
      direction: Math.random() > 0.5 ? 1 : -1,
      route: routes[i % routes.length]
    }));
  };

  const [adBoxes, setAdBoxes] = useState(getInitialAdBoxes());

  const [stats, setStats] = useState({
    totalImpressions: campaignData ? Math.floor(Math.random() * 1000) : 12450,
    activeBoxes: adBoxes.length,
    avgSpeed: 35
  });

  useEffect(() => {
    // Update adBoxes when campaignData changes
    setAdBoxes(getInitialAdBoxes());
  }, [campaignData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAdBoxes(prev => prev.map(box => {
        if (box.status === 'In Motion') {
          let newX = box.x + (box.direction * 2);
          let newDirection = box.direction;
          
          // Bounce off edges
          if (newX <= 5 || newX >= 95) {
            newDirection = -box.direction;
            newX = Math.max(5, Math.min(95, newX));
          }
          
          return { ...box, x: newX, direction: newDirection };
        }
        return box;
      }));

      // Update stats randomly
      setStats(prev => ({
        totalImpressions: prev.totalImpressions + Math.floor(Math.random() * 5),
        activeBoxes: adBoxes.length,
        avgSpeed: 30 + Math.floor(Math.random() * 20)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Motion': return '#27ae60';
      case 'Paused': return '#f39c12';
      case 'Preparing': return '#3498db';
      default: return '#ccc';
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: '12px',
      padding: '25px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: '#8A2BE2', fontSize: '18px', margin: 0 }}>Live AdBox Tracker</h3>
        <div style={{ display: 'flex', gap: '15px', fontSize: '12px' }}>
          <div style={{ color: '#ccc' }}>
            <span style={{ color: '#fff', fontWeight: '600' }}>{stats.totalImpressions.toLocaleString()}</span> Impressions
          </div>
          <div style={{ color: '#ccc' }}>
            <span style={{ color: '#fff', fontWeight: '600' }}>{stats.activeBoxes}</span> Active
          </div>
          <div style={{ color: '#ccc' }}>
            <span style={{ color: '#fff', fontWeight: '600' }}>{stats.avgSpeed}</span> km/h avg
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '300px',
        background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Street Grid */}
        <svg style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.3 }}>
          {/* Horizontal lines */}
          {[25, 50, 75].map(y => (
            <line key={`h-${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          ))}
          {/* Vertical lines */}
          {[25, 50, 75].map(x => (
            <line key={`v-${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          ))}
        </svg>

        {/* Area Labels */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', color: '#8A2BE2', fontSize: '12px', fontWeight: '600' }}>
          Khobar
        </div>
        <div style={{ position: 'absolute', top: '10px', right: '10px', color: '#8A2BE2', fontSize: '12px', fontWeight: '600' }}>
          Dammam
        </div>
        <div style={{ position: 'absolute', bottom: '10px', left: '10px', color: '#8A2BE2', fontSize: '12px', fontWeight: '600' }}>
          Dhahran
        </div>
        <div style={{ position: 'absolute', bottom: '10px', right: '10px', color: '#8A2BE2', fontSize: '12px', fontWeight: '600' }}>
          Jubail
        </div>

        {/* AdBoxes */}
        {adBoxes.map(box => (
          <div
            key={box.id}
            style={{
              position: 'absolute',
              left: `${box.x}%`,
              top: `${box.y}%`,
              transform: 'translate(-50%, -50%)',
              width: '24px',
              height: '16px',
              background: getStatusColor(box.status),
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 10px ${getStatusColor(box.status)}`,
              transition: 'all 0.5s ease',
              cursor: 'pointer'
            }}
            title={`AdBox ${box.id} - ${box.status} - ${box.route}`}
          >
            {box.status === 'In Motion' && <FaPlay size={8} color="white" />}
            {box.status === 'Paused' && <FaPause size={8} color="white" />}
            {box.status === 'Preparing' && <FaClock size={8} color="white" />}
          </div>
        ))}

        {/* Pulse Animation for Active Boxes */}
        <style>
          {`
            @keyframes pulse {
              0% { box-shadow: 0 0 5px currentColor; }
              50% { box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
              100% { box-shadow: 0 0 5px currentColor; }
            }
          `}
        </style>
      </div>

      {/* AdBox Status List */}
      <div style={{ marginTop: '20px' }}>
        <h4 style={{ color: '#fff', fontSize: '14px', marginBottom: '10px' }}>AdBox Status</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {adBoxes.map(box => (
            <div key={box.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '6px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: getStatusColor(box.status)
              }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#fff', fontSize: '12px', fontWeight: '600' }}>
                  AdBox {box.id}
                </div>
                <div style={{ color: '#ccc', fontSize: '10px' }}>
                  {box.status} • {box.route}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdMapTracker; 