import React, { useState, useEffect } from 'react';
import Header from './Header';
import Viewer from './Viewer';
import '../styles/Home.css';

const Home = () => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    let startX;
    let startY;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - startX);
      const deltaY = Math.abs(touch.clientY - startY);

      if (deltaX > 20 || deltaY > 20) {
        setShowMessage(false);
        document.removeEventListener('touchmove', handleTouchMove);
      }
    };

    const modelViewers = document.querySelectorAll('.model-viewer');
    modelViewers.forEach((viewer) => {
      viewer.addEventListener('touchstart', handleTouchStart);
      viewer.addEventListener('touchmove', handleTouchMove);
    });

    return () => {
      modelViewers.forEach((viewer) => {
        viewer.removeEventListener('touchstart', handleTouchStart);
        viewer.removeEventListener('touchmove', handleTouchMove);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const contentSections = document.querySelectorAll('.content, .additional-content');
      contentSections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.8) {
          section.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call initially to check elements on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="main-section">
        <div className="model-viewer">
          <Viewer modelPath="/Bike.glb" />
        </div>
        <div className="model-viewer">
          <Viewer modelPath="/BoxCentered.glb" />
        </div>
      </div>
    </div>
  );
};

export default Home;
