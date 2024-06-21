import React, { useEffect } from 'react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Unobserve once the section is visible
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
      <section className="section who-we-are" data-section="who-we-are">
        <div className="content">
          <h2>Who We Are</h2>
          <p>At Ellanatek, we specialize in taking your message to the streets, literally. With our innovative mobile advertising solutions, we bring your brand, promotion, or campaign directly to your target audience, maximizing visibility and impact. With our commitment to creativity, technology, and exceptional service, we're your partner in driving towards results and a lasting impression.</p>
        </div>
        <div className="additional-content">
          <div className="animated-icon-container">
            <i className="fas fa-users animated-icon"></i>
          </div>
        </div>
      </section>
      <section className="section our-mission" data-section="our-mission">
        <div className="additional-content">
          <div className="animated-icon-container">
            <i className="fas fa-bullseye animated-icon"></i>
          </div>
        </div>
        <div className="content">
          <h2>Our Mission</h2>
          <p>Our mission is to empower businesses of all sizes to reach their target audiences with precision and impact through our innovative mobile advertising solutions. We are dedicated to delivering brand awareness, customer engagement, and revenue growth for our clients by providing the latest in technology, creativity, and strategic thinking.</p>
        </div>
      </section>
      <section className="section our-vision" data-section="our-vision">
        <div className="content">
          <h2>Our Vision</h2>
          <p>Our vision is to be the leading provider of mobile advertising solutions, recognized for our commitment to client success and cutting-edge technology. We envision a future where every partner has the power to connect with audiences in meaningful ways, and we're dedicated to making that vision a reality through continuous improvement and forward-thinking strategies.</p>
        </div>
        <div className="additional-content">
          <div className="animated-icon-container">
            <i className="fas fa-lightbulb animated-icon"></i>
          </div>
        </div>
      </section>
      <section className="section our-services" data-section="our-services">
        <div className="content">
          <h2>Our Services</h2>
          <div className="service-item">
            <div className="service-text">
              <h3>Mobile Billboard Advertising</h3>
              <p>Utilizing strategically positioned bikes equipped with high-resolution digital screens to display dynamic advertisements in high-traffic areas, events, and targeted locations.</p>
            </div>
            <div className="animated-icon-container">
              <i className="fas fa-bullhorn animated-icon"></i>
            </div>
          </div>
          <div className="service-item">
            <div className="service-text">
              <h3>Targeted Campaigns</h3>
              <p>Customized advertising campaigns tailored to specific demographics, geographic locations, and events to ensure maximum exposure and engagement.</p>
            </div>
            <div className="animated-icon-container">
              <i className="fas fa-bullseye animated-icon"></i>
            </div>
          </div>
          <div className="service-item">
            <div className="service-text">
              <h3>Event Support</h3>
              <p>Creating memorable experiences through events, product launches, and promotions using our mobile screens as a focal point.</p>
            </div>
            <div className="animated-icon-container">
              <i className="fas fa-calendar-alt animated-icon"></i>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
