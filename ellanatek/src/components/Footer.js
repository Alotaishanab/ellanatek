// ellanatek/src/components/Footer.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <p>&copy; 2025 AdMotion. {t('footer.allRightsReserved')}</p>
      <p>{t('footer.location')}</p>
    </footer>
  );
};

export default Footer;
