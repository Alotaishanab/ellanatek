import React, { useEffect, useRef, useState } from 'react';
import { FaMotorcycle, FaPlay, FaPause, FaClock } from 'react-icons/fa';

const AdMapTracker = () => {
  const mapRef = useRef(null);
  const [bikers, setBikers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mock biker data for Khobar/Dammam/Dhahran area
  const mockBikers = [
    {
      id: 'biker-1',
      name: 'AdBox-001',
      status: 'in-motion',
      route: 'Khobar - Corniche',
      lat: 26.2172,
      lng: 50.1971,
      speed: 45, // km/h
      ads: 3
    },
    {
      id: 'biker-2',
      name: 'AdBox-002',
      status: 'paused',
      route: 'Dammam - City Center',
      lat: 26.4282,
      lng: 50.1040,
      speed: 0,
      ads: 2
    },
    {
      id: 'biker-3',
      name: 'AdBox-003',
      status: 'preparing',
      route: 'Dhahran - University',
      lat: 26.3414,
      lng: 50.1412,
      speed: 0,
      ads: 1
    },
    {
      id: 'biker-4',
      name: 'AdBox-004',
      status: 'in-motion',
      route: 'Khobar - Mall Area',
      lat: 26.1921,
      lng: 50.2054,
      speed: 38,
      ads: 4
    }
  ];

  useEffect(() => {
    setBikers(mockBikers);
    setIsLoaded(true);

    // Simulate biker movement every 3 seconds
    const interval = setInterval(() => {
      setBikers(prevBikers => 
        prevBikers.map(biker => {
          if (biker.status === 'in-motion') {
            // Simulate small movement (very basic)
            return {
              ...biker,
              lat: biker.lat + (Math.random() - 0.5) * 0.001,
              lng: biker.lng + (Math.random() - 0.5) * 0.001,
            };
          }
          return biker;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-motion': return '#00ff00';
      case 'paused': return '#ff4444';
      case 'preparing': return '#ffaa00';
      default: return '#666';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-motion': return <FaPlay size={12} />;
      case 'paused': return <FaPause size={12} />;
      case 'preparing': return <FaClock size={12} />;
      default: return null;
    }
  };

  if (!isLoaded) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center', 
        color: '#ccc' 
      }}>
        Loading map tracker...
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        <h3 style={{ 
          color: '#fff', 
          fontSize: '18px', 
          fontWeight: '600', 
          margin: 0 
        }}>
          Live AdBox Tracking
        </h3>
        <div style={{ 
          fontSize: '12px', 
          color: '#8A2BE2', 
          fontWeight: '600' 
        }}>
          {bikers.filter(b => b.status === 'in-motion').length} Active
        </div>
      </div>

      {/* Mock Map Area */}
      <div style={{
        width: '100%',
        height: '300px',
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Mock Street Lines */}
        <svg 
          width="100%" 
          height="100%" 
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Mock main roads */}
          <path d="M 0 150 Q 200 100 400 150 Q 600 200 800 150" 
                stroke="#8A2BE2" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M 100 0 Q 150 150 100 300" 
                stroke="#8A2BE2" strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M 300 0 Q 350 150 300 300" 
                stroke="#8A2BE2" strokeWidth="2" fill="none" opacity="0.4" />
        </svg>

        {/* Biker Icons */}
        {bikers.map((biker) => (
          <div
            key={biker.id}
            style={{
              position: 'absolute',
              left: `${15 + (bikers.indexOf(biker) * 20)}%`,
              top: `${25 + (bikers.indexOf(biker) * 15)}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 2s ease-in-out'
            }}
          >
            <div style={{
              background: getStatusColor(biker.status),
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 10px ${getStatusColor(biker.status)}`,
              animation: biker.status === 'in-motion' ? 'pulse 2s infinite' : 'none'
            }}>
              <FaMotorcycle size={12} color="#fff" />
            </div>
            
            {/* Biker Info Tooltip */}
            <div style={{
              position: 'absolute',
              top: '-35px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '10px',
              whiteSpace: 'nowrap',
              opacity: 0.9
            }}>
              {biker.name}
            </div>
          </div>
        ))}

        {/* Area Labels */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          color: '#ccc',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          Khobar
        </div>
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          color: '#ccc',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          Dammam
        </div>
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#ccc',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          Dhahran
        </div>
      </div>

      {/* Status Legend */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        marginTop: '15px',
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: '#00ff00' 
          }} />
          <span style={{ color: '#ccc', fontSize: '12px' }}>In Motion</span>
          <span style={{ color: '#8A2BE2', fontSize: '12px', fontWeight: '600' }}>
            ({bikers.filter(b => b.status === 'in-motion').length})
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: '#ff4444' 
          }} />
          <span style={{ color: '#ccc', fontSize: '12px' }}>Paused</span>
          <span style={{ color: '#8A2BE2', fontSize: '12px', fontWeight: '600' }}>
            ({bikers.filter(b => b.status === 'paused').length})
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ 
            width: '12px', 
            height: '12px', 
            borderRadius: '50%', 
            background: '#ffaa00' 
          }} />
          <span style={{ color: '#ccc', fontSize: '12px' }}>Preparing</span>
          <span style={{ color: '#8A2BE2', fontSize: '12px', fontWeight: '600' }}>
            ({bikers.filter(b => b.status === 'preparing').length})
          </span>
        </div>
      </div>

      {/* Live Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginTop: '15px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#8A2BE2', fontSize: '20px', fontWeight: '700' }}>
            {bikers.reduce((sum, biker) => sum + biker.ads, 0)}
          </div>
          <div style={{ color: '#ccc', fontSize: '11px' }}>Active Ads</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#8A2BE2', fontSize: '20px', fontWeight: '700' }}>
            {Math.round(bikers.filter(b => b.status === 'in-motion').reduce((avg, biker) => avg + biker.speed, 0) / bikers.filter(b => b.status === 'in-motion').length) || 0}
          </div>
          <div style={{ color: '#ccc', fontSize: '11px' }}>Avg Speed (km/h)</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#8A2BE2', fontSize: '20px', fontWeight: '700' }}>
            {bikers.length}
          </div>
          <div style={{ color: '#ccc', fontSize: '11px' }}>Total AdBoxes</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 10px currentColor; }
          50% { box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
          100% { box-shadow: 0 0 10px currentColor; }
        }
      `}</style>
    </div>
  );
};

export default AdMapTracker; 