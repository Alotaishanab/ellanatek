import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import BikeModel from './BikeModel'; // Import BikeModel
import '../styles/AboutUs.css';

const AboutUs = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="about-us">
      <Helmet>
        <title>{t('aboutUs.meta.title')}</title>
        <meta name="description" content={t('aboutUs.meta.description')} />
        <meta name="keywords" content={t('aboutUs.meta.keywords')} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.admotionsa.com/about-us" />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-D5JRG97M98"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D5JRG97M98');
          `}
        </script>
      </Helmet>

      <section className="section who-we-are" data-section="who-we-are">
        <div className="content">
          <h2>{t('aboutUs.sections.whoWeAre.title')}</h2>
          <p>{t('aboutUs.sections.whoWeAre.description')}</p>
        </div>
        <div className="additional-content">
          <div className="bike-model-container">
            <BikeModel />
          </div>
        </div>
      </section>
      
      <section className="section our-mission" data-section="our-mission">
        <div className="additional-content">
          <div className="animated-icon-container">
            <i className="fas fa-bullseye animated-icon" aria-hidden="true"></i>
          </div>
        </div>
        <div className="content">
          <h2>{t('aboutUs.sections.ourMission.title')}</h2>
          <p>{t('aboutUs.sections.ourMission.description')}</p>
        </div>
      </section>

      <section className="section our-vision" data-section="our-vision">
        <div className="content">
          <h2>{t('aboutUs.sections.ourVision.title')}</h2>
          <p>{t('aboutUs.sections.ourVision.description')}</p>
        </div>
        <div className="additional-content">
          <div className="animated-icon-container">
            <i className="fas fa-lightbulb animated-icon" aria-hidden="true"></i>
          </div>
        </div>
      </section>

      <section className="section our-services" data-section="our-services">
        <div className="content">
          <h2>{t('aboutUs.sections.ourServices.title')}</h2>
          <div className="service-item">
            <div className="service-text">
              <h3>{t('aboutUs.sections.ourServices.serviceItems.mobileBillboardAdvertising.title')}</h3>
              <p>{t('aboutUs.sections.ourServices.serviceItems.mobileBillboardAdvertising.description')}</p>
            </div>
          </div>
          <div className="service-item">
            <div className="service-text">
              <h3>{t('aboutUs.sections.ourServices.serviceItems.targetedCampaigns.title')}</h3>
              <p>{t('aboutUs.sections.ourServices.serviceItems.targetedCampaigns.description')}</p>
            </div>
          </div>
          <div className="service-item">
            <div className="service-text">
              <h3>{t('aboutUs.sections.ourServices.serviceItems.eventSupport.title')}</h3>
              <p>{t('aboutUs.sections.ourServices.serviceItems.eventSupport.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;