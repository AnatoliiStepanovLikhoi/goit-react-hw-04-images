// import { useEffect } from 'react';
// import { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const portal = document.querySelector('#portal');

export const Modal = ({ onClose, largeImage, tag }) => {
  // const [modalShown, setModalShown] = useState(false);

  const handleBackdropClick = event => {
    // console.log(event.target);
    // console.log(event.currentTarget);

    if (event.currentTarget === event.target) {
      // setModalShown(prevState => !prevState);
      onClose();
    }
  };

  onkeydown = event => {
    if (event.code === 'Escape') {
      console.log('натиснули esc');
      onClose();
      // setModalShown(prevState => !prevState);
    }
  };

  // useEffect(() => {
  //   const handleKeyDown = e => {
  //     if (e.code === 'Escape') {
  //       console.log('натиснули esc');
  //       onClose();
  //     }
  //   };
  //   console.log('modal componentDidMount');

  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     console.log('modal componentWillUnmount');
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [onClose]);

  return createPortal(
    <div className={styles.Modal__backdrop} onClick={handleBackdropClick}>
      <div className={styles.Modal__content}>
        <img src={largeImage} alt={tag} onClick={onClose} />
      </div>
    </div>,
    portal
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};
