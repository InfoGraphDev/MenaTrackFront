import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.module.scss';

const DarkOverlay = ({ isOpen, lightView, children }) => {
  const overlayContent = isOpen && (
    <div className={`${styles.overlay} ${lightView ?styles.light: styles.dark }`}>
      {children}
    </div>
  );

  const portalElement = document.getElementById('dark-mode-view');
  return portalElement ? ReactDOM.createPortal(
    overlayContent,
    portalElement
  ) : null; 
};

export default DarkOverlay;
