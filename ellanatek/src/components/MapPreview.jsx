import React, { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const MapPreview = ({ region, darkMode = true }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getRegionInfo = (regionName) => {
    const regions = {
      'khobar': { 
        name: 'Al Khobar', 
        lat: 26.2172,
        lng: 50.1971,
        zoom: 12,
        description: 'Eastern Province coastal city'
      },
      'dammam': { 
        name: 'Dammam', 
        lat: 26.4207,
        lng: 50.0888,
        zoom: 11,
        description: 'Capital of Eastern Province'
      },
      'dhahran': { 
        name: 'Dhahran', 
        lat: 26.2869,
        lng: 50.1125,
        zoom: 12,
        description: 'Oil industry hub'
      },
      'jubail': { 
        name: 'Jubail', 
        lat: 27.0174,
        lng: 49.6225,
        zoom: 11,
        description: 'Industrial city'
      },
      'eastern-province': { 
        name: 'Eastern Province', 
        lat: 26.4207,
        lng: 50.0888,
        zoom: 9,
        description: 'Complete Eastern Province coverage'
      },
      'riyadh': { 
        name: 'Riyadh', 
        lat: 24.7136,
        lng: 46.6753,
        zoom: 10,
        description: 'Capital city'
      },
      'jeddah': { 
        name: 'Jeddah', 
        lat: 21.4858,
        lng: 39.1925,
        zoom: 10,
        description: 'Red Sea coastal city'
      },
      'makkah': { 
        name: 'Makkah', 
        lat: 21.3891,
        lng: 39.8579,
        zoom: 11,
        description: 'Holy city'
      }
    };
    return regions[regionName?.toLowerCase()] || regions['khobar'];
  };

  useEffect(() => {
    const regionInfo = getRegionInfo(region);

    // Use OpenStreetMap embed instead of Google Maps for better reliability
    const createOpenStreetMap = () => {
      if (!mapRef.current) return;

      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '400';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '12px';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      
      // OpenStreetMap embed URL
      iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${regionInfo.lng-0.02},${regionInfo.lat-0.02},${regionInfo.lng+0.02},${regionInfo.lat+0.02}&layer=mapnik&marker=${regionInfo.lat},${regionInfo.lng}`;
      
      iframe.onload = () => {
        setIsLoading(false);
      };
      
      iframe.onerror = () => {
        setHasError(true);
        setIsLoading(false);
      };

      // Clear existing content and add iframe
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(iframe);
    };

    // Try Google Maps first, fallback to OpenStreetMap
    const initializeGoogleMap = () => {
      if (!window.google || !mapRef.current) {
        createOpenStreetMap();
        return;
      }

      try {
        // Create map
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          center: { lat: regionInfo.lat, lng: regionInfo.lng },
          zoom: regionInfo.zoom,
          styles: darkMode ? [
            { "elementType": "geometry", "stylers": [{"color": "#212121"}] },
            { "elementType": "labels.text.fill", "stylers": [{"color": "#757575"}] },
            { "elementType": "labels.text.stroke", "stylers": [{"color": "#212121"}] },
            { "featureType": "water", "elementType": "geometry", "stylers": [{"color": "#000000"}] },
            { "featureType": "road", "elementType": "geometry.fill", "stylers": [{"color": "#2c2c2c"}] }
          ] : [],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: true,
          gestureHandling: 'cooperative'
        });

        // Add custom marker
        const marker = new window.google.maps.Marker({
          position: { lat: regionInfo.lat, lng: regionInfo.lng },
          map: mapInstanceRef.current,
          title: `${regionInfo.name} - Campaign Region`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#8A2BE2',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3
          }
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; color: #333;">
              <h4 style="margin: 0 0 5px 0; color: #8A2BE2;">${regionInfo.name}</h4>
              <p style="margin: 0; font-size: 12px;">${regionInfo.description}</p>
              <p style="margin: 5px 0 0 0; font-size: 11px; color: #666;">Campaign Target Region</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });

        // Hide loading overlay when map is ready
        mapInstanceRef.current.addListener('tilesloaded', () => {
          setIsLoading(false);
        });

        // Auto-open info window after map loads
        setTimeout(() => {
          infoWindow.open(mapInstanceRef.current, marker);
        }, 1500);

      } catch (error) {
        console.error('Error initializing Google Map:', error);
        createOpenStreetMap();
      }
    };

    // Load Google Maps API if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      // Try with a different approach - no API key for basic functionality
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleMap;
      script.onerror = () => {
        console.log('Google Maps failed, using OpenStreetMap fallback');
        createOpenStreetMap();
      };
      document.head.appendChild(script);
    } else {
      initializeGoogleMap();
    }

    // Cleanup timeout for loading
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        createOpenStreetMap();
      }
    }, 5000);

    return () => {
      clearTimeout(loadingTimeout);
      if (mapInstanceRef.current) {
        // Cleanup if needed
      }
    };
  }, [region, darkMode, isLoading]);

  const regionInfo = getRegionInfo(region);

  return (
    <div style={{ position: 'relative' }}>
      <div 
        ref={mapRef}
        style={{ 
          width: '100%', 
          height: '400px',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 30px rgba(138, 43, 226, 0.1)',
          background: darkMode 
            ? 'linear-gradient(135deg, #1a1a2e, #16213e)' 
            : 'linear-gradient(135deg, #f0f0f0, #e0e0e0)'
        }} 
      />
      
      {/* Loading/Error overlay */}
      {(isLoading || hasError) && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: darkMode 
              ? 'linear-gradient(135deg, #1a1a2e, #16213e)' 
              : 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            color: darkMode ? '#fff' : '#333',
            zIndex: 1
          }}
        >
          {hasError ? (
            <>
              <FaMapMarkerAlt size={32} color="#8A2BE2" style={{ marginBottom: '10px' }} />
              <h4 style={{ margin: '0 0 8px 0', color: '#8A2BE2' }}>{regionInfo.name}</h4>
              <p style={{ margin: 0, fontSize: '14px', textAlign: 'center' }}>
                {regionInfo.description}<br />
                <span style={{ fontSize: '12px', color: darkMode ? '#ccc' : '#666' }}>
                  Campaign Target Region
                </span>
              </p>
            </>
          ) : (
            <>
              <FaMapMarkerAlt size={32} color="#8A2BE2" style={{ marginBottom: '10px' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>Loading map...</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MapPreview; 