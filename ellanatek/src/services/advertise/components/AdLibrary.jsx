import React, { useState, useEffect } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaEye, 
  FaChartLine, 
  FaCalendarAlt, 
  FaDownload,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaFilter,
  FaSearch
} from 'react-icons/fa';

const AdLibrary = () => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAd, setSelectedAd] = useState(null);

  useEffect(() => {
    // Load ads from localStorage or generate mock data
    loadAds();
  }, []);

  useEffect(() => {
    // Filter ads based on status and search term
    let filtered = ads;
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(ad => ad.status === filterStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(ad => 
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredAds(filtered);
  }, [ads, filterStatus, searchTerm]);

  const loadAds = () => {
    // Mock ad data - in real app, this would come from API
    const mockAds = [
      {
        id: 1,
        title: 'Summer Sale 2024',
        description: 'Get 50% off on all summer items',
        type: 'image',
        thumbnail: '/api/placeholder/400/600',
        status: 'active',
        createdAt: '2024-06-20',
        campaign: '2 Weeks Campaign',
        region: 'Dammam',
        metrics: {
          impressions: 15420,
          views: 12336,
          clicks: 234,
          engagement: 3.2,
          reach: 8945
        },
        predictions: {
          dailyViews: 1800,
          totalImpressions: 25200,
          estimatedReach: 17640
        }
      },
      {
        id: 2,
        title: 'New Restaurant Opening',
        description: 'Grand opening with special offers',
        type: 'video',
        thumbnail: '/api/placeholder/400/600',
        status: 'pending',
        createdAt: '2024-06-25',
        campaign: '1 Month Campaign',
        region: 'Khobar',
        metrics: {
          impressions: 0,
          views: 0,
          clicks: 0,
          engagement: 0,
          reach: 0
        },
        predictions: {
          dailyViews: 2200,
          totalImpressions: 66000,
          estimatedReach: 46200
        }
      },
      {
        id: 3,
        title: 'Tech Conference 2024',
        description: 'Join the biggest tech event in Eastern Province',
        type: 'image',
        thumbnail: '/api/placeholder/400/600',
        status: 'completed',
        createdAt: '2024-05-15',
        campaign: '1 Week Campaign',
        region: 'Dhahran',
        metrics: {
          impressions: 8960,
          views: 7168,
          clicks: 143,
          engagement: 2.8,
          reach: 6272
        },
        predictions: {
          dailyViews: 1200,
          totalImpressions: 8400,
          estimatedReach: 5880
        }
      }
    ];
    
    setAds(mockAds);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#8A2BE2';
      case 'pending': return '#9B59B6';
      case 'completed': return '#6b7280';
      case 'rejected': return '#8A2BE2';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FaCheckCircle />;
      case 'pending': return <FaClock />;
      case 'completed': return <FaCheckCircle />;
      case 'rejected': return <FaExclamationTriangle />;
      default: return <FaClock />;
    }
  };

  const AdCard = ({ ad }) => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    }}
    onClick={() => setSelectedAd(ad)}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
             e.currentTarget.style.boxShadow = '0 12px 40px rgba(138, 43, 226, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
      }}>
        <div>
          <h3 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '16px' }}>
            {ad.title}
          </h3>
          <p style={{ color: '#ccc', margin: 0, fontSize: '12px' }}>
            {ad.description}
          </p>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: `${getStatusColor(ad.status)}20`,
          padding: '4px 8px',
          borderRadius: '12px',
          border: `1px solid ${getStatusColor(ad.status)}40`
        }}>
          <span style={{ color: getStatusColor(ad.status), fontSize: '10px' }}>
            {getStatusIcon(ad.status)}
          </span>
          <span style={{ 
            color: getStatusColor(ad.status), 
            fontSize: '10px', 
            fontWeight: '600',
            textTransform: 'capitalize'
          }}>
            {ad.status}
          </span>
        </div>
      </div>

      {/* Thumbnail */}
      <div style={{
        background: '#000',
        borderRadius: '8px',
        aspectRatio: '16/9',
        marginBottom: '16px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
                     background: 'linear-gradient(45deg, #8A2BE2, #9B59B6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {ad.type === 'video' ? (
            <FaPlay size={24} color="#fff" />
          ) : (
            <FaEye size={24} color="#fff" />
          )}
        </div>
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'rgba(0, 0, 0, 0.7)',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          color: '#fff',
          textTransform: 'uppercase'
        }}>
          {ad.type}
        </div>
      </div>

      {/* Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '16px'
      }}>
                 <div style={{ textAlign: 'center' }}>
           <div style={{ color: '#8A2BE2', fontSize: '18px', fontWeight: '700' }}>
            {ad.metrics.impressions.toLocaleString()}
          </div>
          <div style={{ color: '#ccc', fontSize: '10px' }}>Impressions</div>
        </div>
                 <div style={{ textAlign: 'center' }}>
           <div style={{ color: '#8A2BE2', fontSize: '18px', fontWeight: '700' }}>
            {ad.metrics.views.toLocaleString()}
          </div>
          <div style={{ color: '#ccc', fontSize: '10px' }}>Views</div>
        </div>
                 <div style={{ textAlign: 'center' }}>
           <div style={{ color: '#8A2BE2', fontSize: '18px', fontWeight: '700' }}>
            {ad.metrics.clicks}
          </div>
          <div style={{ color: '#ccc', fontSize: '10px' }}>Clicks</div>
        </div>
                 <div style={{ textAlign: 'center' }}>
           <div style={{ color: '#8A2BE2', fontSize: '18px', fontWeight: '700' }}>
            {ad.metrics.engagement}%
          </div>
          <div style={{ color: '#ccc', fontSize: '10px' }}>Engagement</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '12px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ color: '#ccc', fontSize: '11px' }}>
          {ad.campaign} • {ad.region}
        </div>
        <div style={{ color: '#ccc', fontSize: '11px' }}>
          {new Date(ad.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '24px',
             border: '1px solid rgba(138, 43, 226, 0.3)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <FaChartLine size={20} color="#8A2BE2" />
          <h3 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>
            Ad Library & Analytics
          </h3>
        </div>
        <div style={{ color: '#ccc', fontSize: '14px' }}>
          {filteredAds.length} ads
        </div>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '200px' }}>
                     <FaSearch 
             size={14} 
             color="#8A2BE2" 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)' 
            }} 
          />
          <input
            type="text"
            placeholder="Search ads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '8px 12px 8px 36px',
              color: '#fff',
              fontSize: '14px',
              width: '100%'
            }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '8px 12px',
            color: '#fff',
            fontSize: '14px'
          }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Ad Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {filteredAds.map(ad => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>

      {filteredAds.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#ccc'
        }}>
          <FaChartLine size={48} color="#8A2BE2" style={{ marginBottom: '16px' }} />
          <div style={{ fontSize: '16px', marginBottom: '8px' }}>
            No ads found
          </div>
          <div style={{ fontSize: '14px' }}>
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your filters' 
              : 'Create your first campaign to see analytics here'
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default AdLibrary; 