import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/animations/loading.json';
import '../styles/Home.css';
import CustomMap from './CustomMap';
import logo from '../assets/logo.png'; // Import the logo

// Lazy load the BoxModel component
const BoxModel = lazy(() => import('./BoxModel'));

// ImageLoader Component with Placeholder
const ImageLoader = ({ src, alt, className }) => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className={`image-container ${className}`}>
      {!loaded && (
        <div className="image-placeholder">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            style={{ height: 50, width: 50 }}
          />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`loaded-image ${loaded ? 'visible' : ''}`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

const Home = ({ onNavigate }) => {
  const { t } = useTranslation();
  const adboxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up-active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elementsToObserve = [
      adboxRef.current,
      document.querySelector('.working-region-section')
    ];

    elementsToObserve.forEach(element => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleGetInTouchClick = () => {
    onNavigate(1);
  };

  const leftSpecs = [
    { title: t('home.specs.left.ledModuleSize.title'), value: t('home.specs.left.ledModuleSize.value') },
    // ... other specs
  ];

  const rightSpecs = [
    { title: t('home.specs.right.brightness.title'), value: t('home.specs.right.brightness.value') },
    // ... other specs
  ];

  return (
    <div className="home">
      <Helmet>
        <title>{t('home.meta.title')}</title>
        {/* ... other meta tags */}
      </Helmet>

      <div className="hero-section">
        <header className="top-header">
          <div className="company-name">AdMotion</div>
        </header>

        <div className="video-background-wrapper">
          <ImageLoader src={logo} alt="AdMotion Logo" className="logo-image" />
          <div className="hero-text">ADMOTION</div>
        </div>

        <div className="hero-overlay animated-hero">
          <p className="hero-subtitle">{t('home.intro.subtitle')}</p>
          <p className="hero-description">{t('home.intro.subText')}</p>

          <button className="get-in-touch" onClick={handleGetInTouchClick}>
            {t('home.intro.getInTouch')}
          </button>
        </div>
      </div>

      <div className="working-region-section fade-in-up">
        <div className="working-region-content">
          <h2 className="working-region-title">{t('home.workingRegion.title')}</h2>
          <p className="working-region-description">{t('home.workingRegion.description')}</p>
          <div className="custom-map-container">
            <CustomMap />
          </div>
        </div>
      </div>

      <div className="adbox-section fade-in-up" ref={adboxRef}>
        <div className="adbox-content-wrapper">
          <h2 className="adbox-title">{t('home.adBox.title')}</h2>
          <p className="adbox-subtitle">{t('home.adBox.subtitle')}</p>

          <div className="specs-container">
            <div className="box-specs-layout">
              <div className="specs-column left">
                {leftSpecs.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <h4>{spec.title}</h4>
                    <p>{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="box-model-container">
                <Suspense fallback={<div>{t('home.loadingBoxModel')}</div>}>
                  <BoxModel />
                </Suspense>
              </div>

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
    </div>
  );
};

export default Home;
