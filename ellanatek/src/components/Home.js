import React from 'react';
import '@google/model-viewer'; // Ensure model-viewer is imported
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home white-theme">
      <div className="main-content">
        <section className="main-section">
          <model-viewer
            src="/Bike.glb" // Assuming Bike.glb is in the public folder
            camera-controls
            interaction-prompt="none" // Disable interaction prompt
            disable-zoom // Disable zoom
            style={{ width: '80%', height: '600px' }}
            camera-orbit="45deg 75deg 5m" // Zoom out the initial view
          ></model-viewer>
          <div className="message">
            Swipe the Motorbike to view from each direction
          </div>
        </section>

        <section className="content-section">
          <h2>About the Motorbike</h2>
          <p>
            Here you can add additional content that complements the 3D motorbike model. This section can include text, images, or any other elements you want to display.
          </p>
        </section>

        <section className="model-section">
          <model-viewer
            src="/BoxCentered.glb" // Assuming BoxCentered.glb is in the public folder
            camera-controls
            interaction-prompt="none" // Disable interaction prompt
            disable-zoom // Disable zoom
            style={{ width: '80%', height: '600px' }}
            camera-orbit="45deg 75deg 3m" // Set desired initial view
          ></model-viewer>
        </section>
      </div>
    </div>
  );
};

export default Home;
