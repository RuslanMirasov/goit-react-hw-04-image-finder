import css from './Error.module.css';

export default function Error({ errorText }){
   return (
      <div className={css.Error}>
         <h2 className={css.ErrorTitle}>{errorText[0]}</h2>
         <p className={css.ErrorSubtitle}>{errorText[1]}</p>
      </div>
   );
};