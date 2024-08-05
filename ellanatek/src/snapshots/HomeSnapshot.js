import React from 'react';
import Viewer from '../components/Viewer';
import '../styles/Snapshot.css'; // New CSS file for styling snapshots
import Home from '../components/Home';

const HomeSnapshot = () => {
  return (
    <div className="snapshot">
      <Home />
    </div>
  );
};

export default HomeSnapshot;
