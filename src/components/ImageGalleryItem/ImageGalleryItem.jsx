import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, shouPopup }) => {
   return (
      images.map(({ id, webformatURL, largeImageURL }) => (
         <li key={id} className={css.ImageGalleryItem} onClick={() => shouPopup(largeImageURL)}>
            <img
               src={webformatURL}
               alt="pixabay"
               className={css.ImageGalleryItemImage}
            />
         </li>
      ))
   );
};