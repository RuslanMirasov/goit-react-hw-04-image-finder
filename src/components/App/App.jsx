import { useState, useEffect } from 'react';
import { fetcImages } from '../../api/api';
import Searchbar from 'components/Searchbar/Searchbar';
import Popup from 'components/Popup/Popup';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Error from 'components/Error/Error';
import Loader from 'components/Loader/Loader';
import css from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [imagesTotal, setImagesTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState('');
  const [request, setRequest] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!request) {
      return;
    }

    const getImagesFromApi = async () => {
      setIsLoading(true);
      setError('');
      try {
        const newImages = await fetcImages(page, request);
        if (newImages.totalHits === 0) {
          setError([
            'Sorry',
            'There are no images matching your search query. Please try again',
          ]);
          return;
        }
        setImages(prev => [...prev, ...newImages.hits]);
        setImagesTotal(newImages.totalHits);
      } catch (error) {
        setError([error.message, error.request.responseText]);
      } finally {
        setIsLoading(false);
      }
    };

    getImagesFromApi();
  }, [request, page]);

  const getFormRequest = newRequest => {
    if (request === newRequest) {
      return;
    }
    setRequest(newRequest);
    setPage(1);
    setImages([]);
  };

  const getFormError = formError => {
    setError(formError);
  };

  const onImageClick = url => {
    setModalImage(url);
    setShowModal(true);
  };

  return (
    <main className={css.App}>
      <Searchbar onSubmit={getFormRequest} onError={getFormError} />
      {error.length > 0 && <Error errorText={error} />}
      {images.length > 0 && error.length === 0 && (
        <ImageGallery>
          <ImageGalleryItem images={images} shouPopup={onImageClick} />
        </ImageGallery>
      )}
      {!isLoading && error.length === 0 && images.length < imagesTotal && (
        <Button loadMore={() => setPage(prevState => prevState + 1)} />
      )}
      <Loader showLoader={isLoading} />
      {showModal && (
        <Popup url={modalImage} onClose={() => setShowModal(false)} />
      )}
    </main>
  );
}
