import PropTypes from 'prop-types';
// import { Component } from 'react';
import { useState } from 'react';
import styles from './ImageGalleryItem.module.css';

import { Modal } from 'components/Modal/Modal';
import React from 'react';

export const ImageGalleryItem = ({ basicImage, largeImage, tag }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    if (onkeydown) onkeydown = false;

    setModal(!modal);
  };

  return (
    <li className={styles.imageGalleryItem}>
      <img
        src={basicImage}
        alt={tag}
        className={styles.imageGalleryImage}
        onClick={toggleModal}
      />

      {modal ? (
        <Modal largeImage={largeImage} tag={tag} onClose={toggleModal} />
      ) : null}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  basicImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

// export class ImageGalleryItem extends Component {
//   state = {
//     showModal: false,
//   };

//   toggleModal = () => {
//     this.setState(prevState => ({
//       showModal: !prevState.showModal,
//     }));
//   };

//   render() {
//     const { showModal } = this.state;

//     return (
//       <li className={styles.imageGalleryItem}>
//         <img
//           src={this.props.basicImage}
//           alt={this.props.tag}
//           className={styles.imageGalleryImage}
//           onClick={this.toggleModal}
//         />

//         {showModal ? (
//           <Modal
//             largeImage={this.props.largeImage}
//             tag={this.props.tag}
//             onClose={this.toggleModal}
//           />
//         ) : null}
//       </li>
//     );
//   }
// }
