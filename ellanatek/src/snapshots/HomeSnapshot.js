import React from 'react';
import Viewer from '../components/Viewer';
import '../styles/Snapshot.css'; // New CSS file for styling snapshots

const HomeSnapshot = () => {
  return (
    <div className="snapshot">
      <Viewer modelPath="/rusty_motorbike.glb" />
      
    </div>
  );
};

export default HomeSnapshot;
