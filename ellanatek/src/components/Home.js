import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import '../styles/Home.css';

const BoxModel = lazy(() => import('./BoxModel'));

const Home = ({ onNavigate }) => {
  const { t } = useTranslation();

  /* 
    1. We’ll use a ref to observe the AdBox section 
       and trigger a "fade-in-up-active" class when it appears.
  */
  const adboxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up-active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is in view
    );

    if (adboxRef.current) {
      observer.observe(adboxRef.current);
    }

    // Clean up on unmount
    return () => observer.disconnect();
  }, []);

  const handleGetInTouchClick = () => {
    onNavigate(1);
  };

  const leftSpecs = [
    { title: "LED MODULE SIZE", value: "336MM X 384MM" },
    { title: "OPERATING HUMIDITY", value: "10% - 80% RH" },
    { title: "LED DISPLAY SIZE", value: "1008MM X 384MM" },
    { title: "FULL SCREEN RESOLUTION", value: "336 PIXELS X 128 PIXELS" }
  ];

  const rightSpecs = [
    { title: "BRIGHTNESS", value: ">4500 NITS" },
    { title: "REFRESH RATE", value: ">1920HZ" },
    { title: "VIEWING DISTANCE", value: "3 - 100 METERS" },
    { title: "OPERATING TEMPERATURE", value: "-30°C TO 80°C" }
  ];

  return (
    <div className="home">
      <Helmet>
        <title>{t('home.meta.title')}</title>
        <meta name="description" content={t('home.meta.description')} />
        <meta name="keywords" content={t('home.meta.keywords')} />
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

      {/* --- Hero Section with Intro Animation --- */}
      <div className="hero-section">
        <header className="top-header">
          <h1 className="company-name">AdMotion</h1>
        </header>

        <div className="video-background-wrapper">
          <video autoPlay loop muted playsInline className="background-video">
            <source src="/wait.mp4" type="video/mp4" />
            {t('home.videoUnsupported')}
          </video>
        </div>

        {/* 
          2. The hero-overlay now has a keyframe animation (see Home.css). 
             Also includes a "scroll-indicator" arrow that bounces. 
        */}
        <div className="hero-overlay animated-hero">
          <h2 className="hero-title">{t('home.intro.title')}</h2>
          <p className="hero-subtitle">{t('home.intro.subtitle')}</p>
          <p className="hero-description">{t('home.intro.subText')}</p>

          <button className="get-in-touch" onClick={handleGetInTouchClick}>
            {t('home.intro.getInTouch')}
          </button>

          <div
            className="scroll-indicator"
            onClick={() => {
              // Smooth scroll to AdBox section
              adboxRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            ↓
          </div>
        </div>
      </div>

      {/* --- The AdBox Section (fade-in-up on scroll) --- */}
      <div className="adbox-section fade-in-up" ref={adboxRef}>
        <div className="adbox-content-wrapper">
          <h2 className="adbox-title">{t('home.adBox.title')}</h2>
          <p className="adbox-subtitle">{t('home.adBox.subtitle')}</p>

          <div className="box-specs-layout">
            {/* Left specs */}
            <div className="specs-column left">
              {leftSpecs.map((spec, index) => (
                <div key={index} className="spec-item">
                  <h4>{spec.title}</h4>
                  <p>{spec.value}</p>
                </div>
              ))}
            </div>

            {/* 3D Box Model in center */}
            <div className="box-model-container">
              <Suspense fallback={<div>{t('home.loadingBoxModel')}</div>}>
                <BoxModel />
              </Suspense>
            </div>

            {/* Right specs */}
            <div className="specs-column right">
              {rightSpecs.map((spec, index) => (
                <div key={index} className="spec-item">
                  <h4>{spec.title}</h4>
                  <p>{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
