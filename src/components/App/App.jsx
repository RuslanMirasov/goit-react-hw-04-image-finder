import { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import Popup from 'components/Popup/Popup';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Error } from 'components/Error/Error';
import { Loader } from 'components/Loader/Loader';
import {fetcImages} from "../../api/api";
import css from './App.module.css';


export class App extends Component{

  state = {
    images: [],
    imagesTotal: 0,
    page: 1,
    modalImage: '',
    request: '',
    error: '',
    isLoading: false,
    showModal: false,
  };

  async componentDidUpdate(_, prevState) {
    const { page, request } = this.state;

    if (prevState.request !== request || prevState.page !== page) {
      this.setState({
        isLoading: true,
        error: '',
      });
      try {
        const newImages = await fetcImages(page, request);
        if (newImages.totalHits === 0) {
          this.setState({ error: ['Sorry', 'There are no images matching your search query. Please try again'] });
          return;
        }
        this.setState({
          images: [...this.state.images, ...newImages.hits],
          imagesTotal: newImages.totalHits,
        });
      } catch (error) {
        this.setState({ error: [error.message, error.request.responseText]});
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  getFormRequest = newRequest => {
    this.state.request === newRequest ? alert(`Images for the query "${newRequest}" are already displayed`):
    this.setState({
      request: newRequest,
      page: 1,
      images:[],
    });
  };

  getFormError = formError => {
    this.setState({error: formError});
  };

  onImageClick = (url) => {
    this.setState({modalImage: url, showModal: true});
  }

  onLoadMore = () => {
    this.setState(prevState => ({page: prevState.page + 1}));
  };

  render() {
    const { error, images, isLoading, showModal, imagesTotal, modalImage } = this.state;

    return (
      <main className={css.App}>
        <Searchbar onSubmit={this.getFormRequest} onError={this.getFormError} />
        {error.length > 0 && <Error errorText={error} />}
        {(images.length > 0 && error.length === 0) && 
          <ImageGallery>
            <ImageGalleryItem images={images} shouPopup={this.onImageClick} />
          </ImageGallery>
        }
        {(!isLoading && error.length === 0 && images.length < imagesTotal) && <Button loadMore={this.onLoadMore} />}
        <Loader showLoader={isLoading} />
        {showModal && <Popup url={modalImage} onClose={this.closeModal} />}
      </main>
    );
  };
};

export default App;