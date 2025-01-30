// AboutSnapshot.js
import React from 'react';
import AboutUsPage from '../assets/AboutUsPage.png';
import './AboutSnapshot.css'; // Create this CSS file in the same directory

const AboutSnapshot = () => {
  return (
    <div className="snapshot about-snapshot">
      <img src={AboutUsPage} alt="About Us Page Snapshot" className="snapshot-image" />
    </div>
  );
};

export default AboutSnapshot;
