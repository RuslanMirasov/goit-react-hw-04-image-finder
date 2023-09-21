import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Popup.module.css';


const moralRoot = document.querySelector("#modal-root");

export class Popup extends Component{   

   componentDidMount() {
      window.addEventListener('keydown', this.handleKeydown);
   };
   
   componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeydown);
   };

   handleKeydown = e => {
      if (e.code === 'Escape') {
         this.props.onClose();
      }
   };

   handleOverlayClick = e => {
      if (e.target === e.currentTarget) {
         this.props.onClose();
      }
   };
   
   render() {
      return createPortal(
         <div className={css.Overlay} onClick={this.handleOverlayClick}>
            <div className={css.Modal}>
               <img src={this.props.url} alt="Pixabay"/>
            </div>
         </div>,
         moralRoot,
      );
   };
};

export default Popup;