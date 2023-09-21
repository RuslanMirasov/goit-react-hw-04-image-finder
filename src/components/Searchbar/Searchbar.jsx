import { Component } from 'react';
import { ImSearch } from 'react-icons/im'
import css from './Searchbar.module.css';

export class Searchbar extends Component{   

   state = {
      request: '',
   }

   handleRequestChange = e => {
      this.setState({ request: e.currentTarget.value.toLowerCase() });
   };

   handleSubmit = e => {
      e.preventDefault();

      if (this.state.request.trim() === '') {
         this.props.onError(['Field is empty!', 'Please enter the search request.']);
         return;
      }

      this.props.onSubmit(this.state.request);
      this.setState({ request: '' });
   };

   render() {
      return (
         <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={this.handleSubmit}>
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
               value={this.state.request}
               onChange={this.handleRequestChange}
               />
            </form>
         </header>
      )
   }
};

export default Searchbar;