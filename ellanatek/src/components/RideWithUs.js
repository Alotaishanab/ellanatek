import React from 'react';
import '../styles/RideWithUs.css';
import rideWithUsVideo from '../assets/ride-with-us.mp4'; // Adjust the path to your video file

const RideWithUs = () => {
  return (
    <div className="ride-with-us">
      <video autoPlay loop muted className="ride-video">
        <source src={rideWithUsVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="ride-content">
{/*         <h1>Ride With Us</h1>
        <p>Information about riding with us.</p> */}
      </div>
    </div>
  );
}

export default RideWithUs;