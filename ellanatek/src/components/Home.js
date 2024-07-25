import React from 'react';
import '@google/model-viewer'; // Ensure model-viewer is imported
import '../styles/Home.css';

const Home = ({ onNavigate }) => {
  const handleGetInTouchClick = () => {
    onNavigate(1); // Assuming '1' is the index for AdvertiseWithUs
  };

  return (
    <div className="home">
      <div className="admotion-text">AdMotion</div>
      <div className="main-content">
        <section className="intro-section">
          <div className="intro-text">
            <div>Your Ads In Motion</div>
            <div>Reaching every destination</div>
            <div className="sub-text">
              Grow your Business With Us 
              <button className="get-in-touch" onClick={handleGetInTouchClick}>
                Get in touch
              </button>
            </div>
          </div>
          <div className="model-wrapper">
            <model-viewer
              src="/Bike.glb" // Assuming Bike.glb is in the public folder
              camera-controls
              interaction-prompt="none" // Disable interaction prompt
              disable-zoom // Disable zoom
              className="bike-model"
              style={{ width: '80%', height: '600px' }}
              camera-orbit="45deg 75deg 5m" // Zoom out the initial view
            ></model-viewer>
            <div className="model-message">
              Swipe to explore the 3D model
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2>About the Motorbike</h2>
          <p>
            Here you can add additional content that complements the 3D motorbike model. This section can include text, images, or any other elements you want to display.
          </p>
        </section>

        <section className="model-section">
          <div className="model-container">
            <model-viewer
              src="/BoxCentered.glb" // Assuming BoxCentered.glb is in the public folder
              camera-controls
              interaction-prompt="none" // Disable interaction prompt
              disable-zoom // Disable zoom
              className="box-model"
              style={{ width: '80%', height: '600px' }}
              camera-orbit="45deg 75deg 3m" // Set desired initial view
            ></model-viewer>
            <div className="info-box">
              <h3>LED Module Specifications</h3>
              <ul>
                <li>Module Size: 336mm x 384mm</li>
                <li>Display Size: 1008mm x 384mm</li>
                <li>Resolution: 336 pixels x 128 pixels</li>
                <li>Brightness: >4500nits</li>
                <li>Refresh Rate: >1920hz</li>
                <li>Viewing Distance: 3 - 100 meters</li>
                <li>Operating Temperature: -30°C to 80°C</li>
                <li>Operating Humidity: 10% - 80% RH</li>
              </ul>
            </div>
            <div className="connector"></div>
          </div>
          <img src="assets/Image.jpg" alt="Sample" className="connected-image" />
        </section>
      </div>
    </div>
  );
};

export default Home;
