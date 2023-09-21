import css from './Button.module.css';

export const Button = ({ loadMore }) => {
   return (
      <button type='button' className={css.Button} onClick={loadMore}>Load more</button>
   );
};