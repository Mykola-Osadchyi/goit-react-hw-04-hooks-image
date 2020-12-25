import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  imageUrl,
  imageAlt,
  imageForModal,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && <Modal onClose={toggleModal} image={imageForModal} />}
      <li className={s.ImageGalleryItem}>
        <img
          src={imageUrl}
          alt={imageAlt}
          className={s.ImageGalleryItem_image}
          onClick={toggleModal}
        />
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  imageForModal: PropTypes.string.isRequired,
};
