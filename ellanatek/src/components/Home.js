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
            Motorbike advertising is an innovative and impactful way to connect with your audience in bustling urban environments. Discover the remarkable benefits and features that make motorbike advertising a standout choice:
          </p>
          <p>
            <strong><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12h2m4 0h-6m-2 0h-6M3 12h2m6 0H9m-2 0H5m2 0H5m6 0h.01" /></svg> High Visibility</strong><br/>
            Motorbikes effortlessly weave through traffic, ensuring your ads reach countless eyes, from busy pedestrians to stationary drivers.
          </p>
          <p>
            <strong><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg> Cost-Effective</strong><br/>
            Maximize your budget! Motorbike ads offer a more economical option compared to traditional billboards and digital advertising, providing excellent value for money.
          </p>
          <p>
            <strong><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg> Versatility</strong><br/>
            Unleash your creativity with motorbike ads. From digital screens to vibrant banners and posters, the possibilities for eye-catching campaigns are endless.
          </p>
          <p>
            <strong><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg> Flexibility</strong><br/>
            Adapt and conquer. Motorbikes can be quickly rerouted and deployed in various locations, offering unmatched flexibility for your advertising strategies.
          </p>
          <p>
            <strong><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18" /></svg> Engagement</strong><br/>
            Capture attention like never before. The unique and mobile nature of motorbike ads creates memorable impressions, boosting brand recognition and customer engagement.
          </p>
          <p>
            <strong><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18" /></svg> Local Impact</strong><br/>
            Support and strengthen community ties. Motorbike ads are perfect for promoting local businesses, events, and special offers, making a positive impact within the community.
          </p>
          <p>
            By leveraging the agility and visibility of motorbike advertising, you can effectively engage your target audience and elevate your marketing efforts to new heights.
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

        {/* New section for rectangular box with text and images */}
        <section className="rectangular-box">
          <div className="rectangular-box-text">
            <p>• DELIVER YOUR ADS IN DESIGNATED LOCATIONS WITHIN THE CITY OF KHOBAR</p>
            <p>• DYNAMIC CONTENT ALLOCATION: UPLOAD PREFERRED ADS AND CHOOSE PREFERRED LOCATIONS</p>
            <p>• TARGET YOUR CHOSEN AUDIENCE & PROVIDE INTERACTABLE AND EXCLUSIVE OFFERS</p>
          </div>
          <div className="rectangular-box-image-1">
            <div className="rectangular-box-image-2"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;