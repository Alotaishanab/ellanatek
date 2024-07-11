import React from 'react';
import '../styles/ToggleButton.css';
import threeSidesIcon from '../assets/3.webp';
import xIcon from '../assets/X.png';

const ToggleButton = ({ toggleNav, navOpen }) => {
  return (
    <button id="nav-toggle" type="button" onClick={toggleNav}>
      <span className={`icon open ${navOpen ? 'hidden' : ''}`}>
        <img src={threeSidesIcon} alt="Menu Bars" style={{ width: '70%', height: 'auto' }} />
      </span>
      <span className={`icon close ${navOpen ? '' : 'hidden'}`}>
        <img src={xIcon} alt="Close Icon" style={{ width: '70%', height: 'auto' }} />
      </span>
    </button>
  );
};

export default ToggleButton;

