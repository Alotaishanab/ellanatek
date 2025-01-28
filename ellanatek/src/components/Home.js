// Home.js
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

// Error Boundary Component to catch errors in lazy-loaded components
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error('ErrorBoundary caught an error:', error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-fallback">Something went wrong.</div>;
    }
    return this.props.children;
  }
}

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
        onLoad={() => {
          console.log(`${alt} loaded.`);
          setLoaded(true);
        }}
        onError={() => {
          console.error(`Failed to load image: ${alt}`);
          setLoaded(true); // Proceed even if image fails to load
        }}
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
    { 
      title: t('home.specs.left.ledModuleSize.title'), 
      value: t('home.specs.left.ledModuleSize.value') 
    },
    { 
      title: t('home.specs.left.operatingHumidity.title'), 
      value: t('home.specs.left.operatingHumidity.value') 
    },
    { 
      title: t('home.specs.left.ledDisplaySize.title'), 
      value: t('home.specs.left.ledDisplaySize.value') 
    },
    { 
      title: t('home.specs.left.fullScreenResolution.title'), 
      value: t('home.specs.left.fullScreenResolution.value') 
    }
  ];

  const rightSpecs = [
    { 
      title: t('home.specs.right.brightness.title'), 
      value: t('home.specs.right.brightness.value') 
    },
    { 
      title: t('home.specs.right.refreshRate.title'), 
      value: t('home.specs.right.refreshRate.value') 
    },
    { 
      title: t('home.specs.right.viewingDistance.title'), 
      value: t('home.specs.right.viewingDistance.value') 
    },
    { 
      title: t('home.specs.right.operatingTemperature.title'), 
      value: t('home.specs.right.operatingTemperature.value') 
    }
  ];

  return (
    <div className="home">
      <Helmet>
        <title>{t('home.meta.title')}</title>
        <meta name="description" content={t('home.meta.description')} />
        <meta name="keywords" content={t('home.meta.keywords')} />
        <meta name="robots" content="index, follow" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&family=Jost:wght@400;600&display=swap" rel="stylesheet" />
        <link rel="canonical" href="https://www.admotionsa.com" />
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

      <ErrorBoundary>
        <div className="hero-section">
          <header className="top-header">
            {/* Removed title */}
          </header>

          {/* Replaced video with logo using ImageLoader */}
          <div className="video-background-wrapper">
            <ImageLoader 
              src={logo} 
              alt="AdMotion Logo" 
              className="logo-image" 
            />
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
            <p className="working-region-description">
              {t('home.workingRegion.description')}
            </p>
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
                  <Suspense fallback={
                    <div className="model-loading">
                      <Lottie
                        animationData={loadingAnimation}
                        loop={true}
                        style={{ height: 80, width: 80 }}
                      />
                    </div>
                  }>
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
      </ErrorBoundary>
    </div>
  );
};

export default Home;
