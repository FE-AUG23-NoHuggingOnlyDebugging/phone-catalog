import styles from './categoryItem.module.scss';

import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  model: string;
  totalModel: number;
};

const CategoryItem: React.FC<Props> = ({ image, title, model, totalModel }) => {
  return (
    <li className={cn(styles.category_list__item, styles.category_item)}>
      <Link to={'catalog/' + model} className={styles.link__cover} />
      <div
        className={cn(
          styles.category_item__bg,
          styles[`category_item__bg_${model}`],
        )}
      >
        <img
          src={image.src}
          alt={image.alt}
          className={cn(
            styles.category_item__image,
            styles[`category_item__image_${model}`],
          )}
        />
      </div>

      <h3 className={styles.category_item__title}>{title}</h3>

      <p className={styles.category_item__model}>{`${totalModel} models`}</p>
    </li>
  );
};

export default CategoryItem;
