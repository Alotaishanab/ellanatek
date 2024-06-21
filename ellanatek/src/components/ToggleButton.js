import React from 'react';
import '../styles/ToggleButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const ToggleButton = ({ toggleNav, navOpen }) => {
  return (
    <button id="nav-toggle" type="button" onClick={toggleNav}>
      <FontAwesomeIcon icon={faBars} className={`icon open ${navOpen ? 'hidden' : ''}`} />
      <FontAwesomeIcon icon={faTimes} className={`icon close ${navOpen ? '' : 'hidden'}`} />
    </button>
  );
};

export default ToggleButton;
