import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from './services/imagesApi';
import Container from './components/Container/Container';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { toast } from 'react-toastify';
import Spinner from './components/Loader/Loader';
import Button from './components/Button/Button';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [images, setImages] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    setImages([]);
    setStatus('pending');
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (pageNumber === 1) return;
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const getImages = () => {
    setIsLoading(true);
    setShowBtn(false);

    fetchImages(searchQuery, pageNumber)
      .then(({ hits }) => {
        if (hits.length === 0) {
          toast.error('Images not found or no more images');
          setStatus('resolved');
          setIsLoading(false);
        } else {
          setImages(prevImages => [...prevImages, ...hits]);
          setStatus('resolved');
          setShowBtn(true);
          setIsLoading(false);
          if (pageNumber !== 1) {
            scrollToBottom();
          }
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  const handleFormSubmit = query => {
    setPageNumber(1);
    setSearchQuery(query);
  };

  const incrementPage = () => {
    setPageNumber(pageNumber => pageNumber + 1);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  if (status === 'idle') {
    return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />
        <ToastContainer />
      </Container>
    );
  }
  if (status === 'pending') {
    return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />
        <div className="spinner">
          <Spinner />
        </div>
      </Container>
    );
  }
  if (status === 'rejected') {
    return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />
        <div>{error.message}</div>
      </Container>
    );
  }
  if (status === 'resolved') {
    return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} />
        {isLoading && (
          <div className="spinner">
            <Spinner />
          </div>
        )}
        {showBtn && <Button click={incrementPage} />}
        <ToastContainer />
      </Container>
    );
  }
}
