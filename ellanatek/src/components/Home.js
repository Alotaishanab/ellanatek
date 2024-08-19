import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/Home.css';

const BoxModel = lazy(() => import('./BoxModel'));

const Home = ({ onNavigate }) => {
  const handleGetInTouchClick = () => {
    onNavigate(1);
  };

  return (
    <div className="home">
      <Helmet>
        <title>AdMotion - Your Ads in Motion</title>
        <meta
          name="description"
          content="AdMotion is a leading mobile advertising solution, reaching every destination with high-impact visual ads. Learn more about our services and how we can help grow your business."
        />
        <meta
          name="keywords"
          content="Mobile Advertising, Marketing, Advertising, AdMotion, Targeted Campaigns"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.admotionsa.com" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AdMotion",
              "url": "https://www.admotionsa.com",
              "logo": "https://www.admotionsa.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "info@admotionsa.com",
                "contactType": "Customer Service"
              }
            }
          `}
        </script>
      </Helmet>

      <div className="content-wrapper">
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
              {/* Model content can be placed here if needed */}
            </div>
          </section>

          <section className="model-section">
            <div className="box-container">
              <div className="adbox-section">
                <div className="video-background-wrapper">
                  <video autoPlay loop muted playsInline className="background-video">
                    <source src="/wait.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <p className="adbox-title">The AdBox</p>
                <p className="adbox-subtitle">Sleek, Mobile Advertising</p>
                <div className="box-container">
                  <Suspense fallback={<div>Loading Box Model...</div>}>
                    <BoxModel />
                  </Suspense>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;