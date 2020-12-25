import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  return (
    <>
      <ul className={s.ImageGallery}>
        {images.map(item => (
          <ImageGalleryItem
            key={item.id}
            imageUrl={item.webformatURL}
            imageAlt={item.tags}
            imageForModal={item.largeImageURL}
          />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
