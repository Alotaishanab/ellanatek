import React from 'react';
import '../styles/Snapshot.css'; // CSS file for styling snapshots
import BikeModel from '../components/BikeModel'; // Ensure this is the component for the bike model

const HomeSnapshot = () => {
  return (
    <div className="snapshot">
      <BikeModel />
    </div>
  );
};

export default HomeSnapshot;
