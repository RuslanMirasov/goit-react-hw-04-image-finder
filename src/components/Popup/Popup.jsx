import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Popup.module.css';

const moralRoot = document.querySelector('#modal-root');

export default function Popup({ url, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    }; // eslint-disable-next-line
  }, []);

  const handleKeydown = e => {
    e.code === 'Escape' && onClose();
  };

  const handleOverlayClick = e => {
    e.target === e.currentTarget && onClose();
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        <img src={url} alt="Pixabay" />
      </div>
    </div>,
    moralRoot
  );
}
