import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Lottie from 'lottie-react';

// Replace these with your actual Lottie JSON files
import whoWeAreAnim from '../assets/animations/whoWeAre.json';
import missionAnim from '../assets/animations/mission.json';
import visionAnim from '../assets/animations/vision.json';
import servicesAnim from '../assets/animations/services.json';

import '../styles/AboutUs.css';

const AboutUs = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const sections = document.querySelectorAll('.about-section');
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="about-us-container">
      <Helmet>
        <title>{t('aboutUs.meta.title')}</title>
        <meta name="description" content={t('aboutUs.meta.description')} />
        <meta name="keywords" content={t('aboutUs.meta.keywords')} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.admotionsa.com/about-us" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D5JRG97M98"></script>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet" />
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D5JRG97M98');
          `}
        </script>
      </Helmet>

      <header className="admotion-header">
        <h1 className="admotion-text">ADMOTION</h1>
      </header>

      {/* Section: Who We Are */}
      <section className="about-section section-who-we-are">
        <div className="animation-container">
          <Lottie className="lottie-animation" animationData={whoWeAreAnim} loop />
        </div>
        <div className="section-content">
          <h2>{t('aboutUs.sections.whoWeAre.title')}</h2>
          <p>{t('aboutUs.sections.whoWeAre.description')}</p>
        </div>
      </section>

      {/* Section: Our Mission */}
      <section className="about-section section-our-mission">
        <div className="animation-container">
          <Lottie className="lottie-animation" animationData={missionAnim} loop />
        </div>
        <div className="section-content">
          <h2>{t('aboutUs.sections.ourMission.title')}</h2>
          <p>{t('aboutUs.sections.ourMission.description')}</p>
        </div>
      </section>

      {/* Section: Our Vision */}
      <section className="about-section section-our-vision">
        <div className="animation-container">
          <Lottie className="lottie-animation" animationData={visionAnim} loop />
        </div>
        <div className="section-content">
          <h2>{t('aboutUs.sections.ourVision.title')}</h2>
          <p>{t('aboutUs.sections.ourVision.description')}</p>
        </div>
      </section>

      {/* Section: Our Services */}
      <section className="about-section section-our-services">
        <div className="animation-container">
          <Lottie className="lottie-animation" animationData={servicesAnim} loop />
        </div>
        <div className="section-content">
          <h2>{t('aboutUs.sections.ourServices.title')}</h2>
          <div className="services-list">
            <div className="service-item">
              <h3>{t('aboutUs.sections.ourServices.serviceItems.mobileBillboardAdvertising.title')}</h3>
              <p>{t('aboutUs.sections.ourServices.serviceItems.mobileBillboardAdvertising.description')}</p>
            </div>
            <div className="service-item">
              <h3>{t('aboutUs.sections.ourServices.serviceItems.targetedCampaigns.title')}</h3>
              <p>{t('aboutUs.sections.ourServices.serviceItems.targetedCampaigns.description')}</p>
            </div>
            <div className="service-item">
              <h3>{t('aboutUs.sections.ourServices.serviceItems.eventSupport.title')}</h3>
              <p>{t('aboutUs.sections.ourServices.serviceItems.eventSupport.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
