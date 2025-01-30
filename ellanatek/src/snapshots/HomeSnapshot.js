// HomeSnapshot.js
import React from 'react';
import HomePage from '../assets/HomePage.png';
import './HomeSnapshot.css'; // Create this CSS file in the same directory

const HomeSnapshot = () => {
  return (
    <div className="snapshot home-snapshot">
      <img src={HomePage} alt="Home Page Snapshot" className="snapshot-image" />
    </div>
  );
};

export default HomeSnapshot;
