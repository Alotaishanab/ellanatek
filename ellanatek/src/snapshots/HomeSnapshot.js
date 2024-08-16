import React from 'react';
import '../styles/Snapshot.css'; // CSS file for styling snapshots
import BoxModel from '../components/BoxModel'; // Ensure this is the component for the bike model

const HomeSnapshot = () => {
  return (
    <div className="snapshot">
      <BoxModel />
    </div>
  );
};

export default HomeSnapshot;
