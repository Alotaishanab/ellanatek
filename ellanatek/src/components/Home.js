// ellanatek/src/components/Home.js
import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import '../styles/Home.css';

const BoxModel = lazy(() => import('./BoxModel'));

const Home = ({ onNavigate }) => {
  const { t } = useTranslation();

  const handleGetInTouchClick = () => {
    onNavigate(1);
  };

  return (
    <div className="home">
      <Helmet>
        <title>{t('home.meta.title')}</title>
        <meta
          name="description"
          content={t('home.meta.description')}
        />
        <meta
          name="keywords"
          content={t('home.meta.keywords')}
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
        <div className="admotion-text">{t('home.admotionText')}</div>
        <div className="main-content">
          <section className="intro-section">
            <div className="intro-text">
              <div>{t('home.intro.title')}</div>
              <div>{t('home.intro.subtitle')}</div>
              <div className="sub-text">
                {t('home.intro.subText')}
                <button className="get-in-touch" onClick={handleGetInTouchClick}>
                  {t('home.intro.getInTouch')}
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
                    {t('home.videoUnsupported')}
                  </video>
                </div>

                <p className="adbox-title">{t('home.adBox.title')}</p>
                <p className="adbox-subtitle">{t('home.adBox.subtitle')}</p>
                <div className="box-container">
                  <Suspense fallback={<div>{t('home.loadingBoxModel')}</div>}>
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
