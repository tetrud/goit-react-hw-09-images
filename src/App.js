import { useState, useEffect } from 'react';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Button from './components/Button';
import Modal from './components/Modal';
import ImagesApi from './services/imagesApi';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [tags] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = () => {
      setIsLoading(true);

      ImagesApi.fetchImages({ searchQuery: query, currentPage })
        .then(hits => {
          setImages(prevImages => [...prevImages, ...hits]);
          if (currentPage > 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        })

        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false));
    };

    fetchImages();
  }, [currentPage, query]);

  const updatePage = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const openModal = imageUrl => {
    setLargeImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setLargeImage('');
    setShowModal(false);
  };

  const onChangeQuery = query => {
    setQuery(query);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onChangeQuery} />
      {error && <h1>Images not found!</h1>}

      {isLoading && <Loader />}

      <ImageGallery images={images} onClick={openModal} />

      {images.length > 0 && (
        <Button type="button" text="Load more" onClick={updatePage} />
      )}

      {showModal && (
        <Modal largeImage={largeImage} alt={tags} onClose={closeModal} />
      )}
    </div>
  );
}
