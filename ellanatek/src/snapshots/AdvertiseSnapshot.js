// AdvertiseSnapshot.js
import React from 'react';
import AdvertisePage from '../assets/AdvertisePage.png';
import './AdvertiseSnapshot.css'; // Create this CSS file in the same directory

const AdvertiseSnapshot = () => {
  return (
    <div className="snapshot advertise-snapshot">
      <img src={AdvertisePage} alt="Advertise Page Snapshot" className="snapshot-image" />
    </div>
  );
};

export default AdvertiseSnapshot;
