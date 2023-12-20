import ContentLoader from 'react-content-loader';

import style from './CartSkeletonLoader.module.scss';

export const CartSkeletonLoader = () => {
  const theme = localStorage.getItem('theme');

  return (
    <div className={style.card}>
      <ContentLoader
        speed={2}
        backgroundColor={theme === 'light' ? '#f3f3f3' : '#3b3e4a'}
        foregroundColor={theme === 'light' ? '#ecebeb' : '#323542'}
        className={style.content}
      >
        <rect
          y="32" rx="2" ry="2"
          className={style.close} />

        <rect
          x="40" rx="2" ry="2"
          className={style.image} />

        <rect
          x="144" y="30" rx="2"
          ry="2" className={style.name} />

        <rect
          x="504" y="26" rx="2"
          ry="2" className={style.buttons} />

        <rect
          x="624" y="26" rx="2"
          ry="2" className={style.price} />
      </ContentLoader>
    </div>
  );
};
