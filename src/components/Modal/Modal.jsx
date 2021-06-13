import { useEffect } from 'react';

import './Modal.scss';

export default function Modal({ largeImage, alt, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, { once: true });
  }, []);

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={largeImage} alt={alt} />
      </div>
    </div>
  );
}
