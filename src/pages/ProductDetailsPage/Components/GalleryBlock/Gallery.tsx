import { ProductDetails } from '../../../../types/ProductDetails';
import cn from 'classnames';
import style from './Gallery.module.scss';
import React from 'react';

type Props = {
  mainImage: string | undefined;
  product: ProductDetails;
  setMainImage: (value: string | undefined) => void;
};

export const Gallery: React.FC<Props> = ({
  mainImage,
  product,
  setMainImage,
}) => {
  return (
    <div className={style.galleryBlock}>
      <div className={style.galleryBlock__leftSide}>
        {product?.images.map((image) => (
          <img
            src={image}
            key={image}
            alt="iphone"
            id={cn({
              [style.activeImage]: mainImage === image,
            })}
            className={style.galleryBlock__leftSide_img}
            onClick={(event) => {
              const target = event.target as HTMLImageElement;
              setMainImage(target.src);
            }}
          />
        ))}
      </div>
      <div className={style.galleryBlock__rightSide}>
        <img
          className={style.galleryBlock__rightSide_img}
          src={mainImage}
          alt="iphone"
        />
      </div>
    </div>
  );
};
