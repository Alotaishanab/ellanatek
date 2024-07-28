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
          <div className="box-container">
            <div className="adbox-section">
              <h3 className="adbox-title">The AdBox</h3>
              <p className="adbox-subtitle">Sleek, Mobile Advertising</p>
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <model-viewer
                  src="/BoxCentered.glb" // Assuming BoxCentered.glb is in the public folder
                  camera-controls
                  interaction-prompt="none" // Disable interaction prompt
                  disable-zoom // Disable zoom
                  className="box-model"
                  style={{ width: '731px', height: '541px' }} // Set desired initial view
                ></model-viewer>
                <div className="info-box">
                  <ul>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none">
                        <ellipse cx="18" cy="17.5" rx="18" ry="17.5" fill="#D9D9D9"/>
                      </svg>
                      <div className="info-box-item">
                        <span>LED Module Size: 336mm x 384mm </span>
                        <span> & </span>
                        <span>Operating Humidity: 10% - 80% RH</span>
                      </div>
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none">
                        <ellipse cx="18" cy="17.5" rx="18" ry="17.5" fill="#D9D9D9"/>
                      </svg>
                      <div className="info-box-item">
                        <span>LED Display Size: 1008mm x 384mm</span>
                        <span> & </span>
                        <span>Full Screen Resolution: 336 pixels x 128 pixels</span>
                      </div>
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none">
                        <ellipse cx="18" cy="17.5" rx="18" ry="17.5" fill="#D9D9D9"/>
                      </svg>
                      <div className="info-box-item">
                        <span>Brightness: 4500 nits</span>
                        <span> & </span>
                        <span>Refresh Rate: 1920Hz</span>
                      </div>
                    </li>
                    <li>
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="35" viewBox="0 0 36 35" fill="none">
                        <ellipse cx="18" cy="17.5" rx="18" ry="17.5" fill="#D9D9D9"/>
                      </svg>
                      <div className="info-box-item">
                        <span>Viewing Distance: 3 - 100 meters</span>
                        <span> & </span>
                        <span>Operating Temperature: -30°C to 80°C</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;