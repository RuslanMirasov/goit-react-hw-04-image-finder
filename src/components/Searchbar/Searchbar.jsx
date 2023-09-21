import { useState } from 'react';
import { ImSearch } from 'react-icons/im'
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit, onError }) {

   const [request, setRequest] = useState('');

   const handleRequestChange = e => {
      setRequest(e.currentTarget.value.toLowerCase());
   };

   const handleSubmit = e => {
      e.preventDefault();
      if (request.trim() === '') {
         onError(['Field is empty!', 'Please enter the search request.']);
         return;
      }
      onSubmit(request);
      setRequest('');
   };


   return (
      <header className={css.Searchbar}>
         <form className={css.SearchForm} onSubmit={handleSubmit}>
            <button type="submit" className={css.SearchFormButton}>
               <ImSearch/>
               <span className={css.SearchFormButtonLabel}>Search</span>
            </button>
            <input
            className={css.SearchFormInput}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={request}
            onChange={handleRequestChange}
            />
         </form>
      </header>
   )
};