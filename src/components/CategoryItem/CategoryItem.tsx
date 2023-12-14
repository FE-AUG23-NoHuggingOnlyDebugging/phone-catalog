import styles from './categoryItem.module.scss';

import React from 'react';
import cn from 'classnames';

type Props = {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  model: string;
  modelCount: number;
};

const CategoryItem: React.FC<Props> = ({ image, title, model, modelCount }) => (
  <li className={cn(styles.category_list__item, styles.category_item)}>
    <div
      className={cn(
        styles.category_item__bg,
        styles[`category_item__bg_${model}`],
      )}
    >
      <img
        src={process.env.PUBLIC_URL + image.src}
        alt={image.alt}
        className={cn(
          styles.category_item__image,
          styles[`category_item__image_${model}`],
        )}
      />
    </div>

    <h3 className={styles.category_item__title}>{title}</h3>

    <p className={styles.category_item__model}>{`${modelCount} models`}</p>
  </li>
);

export default CategoryItem;
