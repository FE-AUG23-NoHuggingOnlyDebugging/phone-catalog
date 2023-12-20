'use strict';
import { Link } from 'react-router-dom';
import style from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={style.ErrorContainer}>
      <div className={style.ErrorWrapper}>
        <div className={style.iphoneX}>
          <i>Speaker</i>
          <b>Camera</b>
          <s id={style.Error}>ERROR</s>
          <s>404</s>
          <s id={style.PageNotFound}>Page Not Found</s>

          <span>Left action button</span>
          <span>Right action button</span>
        </div>

        <div className={style.ErrorMessage}>
          <h1 className={style.ErrorMessage__title}>Oh no!!</h1>
          <p className={style.ErrorMessage__text}>
            You&apos;re either misspelling the URL or requesting a page
            that&apos;s no longer here.
          </p>
          <Link className={style.button} to="/">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};
