import cn from 'classnames';
import { Link } from 'react-router-dom';
import style from './Features.module.scss';
import React from 'react';
import { ProductDetails } from '../../../../types/ProductDetails';
import { colors } from './Colors';
import AddToCard from '../../../../components/AddToCard/AddToCard';
import AddToFavorite from '../../../../components/AddToFavorite/AddToFavorite';
import { useAppSelector } from '../../../../store/hooks';
import { selectFavoritesProducts } from '../../../../store/favoriteSlice';
import { selectCartProducts } from '../../../../store/cartSlice';

type Props = {
  product: ProductDetails;
  type: string | undefined;
  productId: string | undefined;
  activeMemory: string | null;
  activeColor: string | null;
  setActiveMemory: (value: string | null) => void;
  setActiveColor: (value: string | null) => void;
};

export const Features: React.FC<Props> = ({
  product,
  type,
  activeColor,
  activeMemory,
  setActiveColor,
  setActiveMemory,
}) => {
  const favoritesStorageList = useAppSelector(selectFavoritesProducts);
  const cartStorageList = useAppSelector(selectCartProducts);

  return (
    <div className={style.features}>
      <div className={style.features__colors}>
        <p className={style.features__colorsText}>Available colors</p>
        <div className={style.features__colorsBlock}>
          {product?.colorsAvailable.map((color) => {
            const objectColor = colors.find(
              (colorItem) => colorItem.name === color,
            );
            return (
              <Link
                to={`/product/${type}/${product.namespaceId}-${activeMemory}-${color}`}
                key={color}
                className={cn(style.colorItemWrapper, {
                  [style.activeColor]: activeColor === color,
                })}
                onClick={() => {
                  setActiveColor(color);
                }}
              >
                <div
                  style={{ backgroundColor: objectColor?.hash }}
                  className={style.colorItem}
                />
              </Link>
            );
          })}
        </div>
      </div>

      <div className={style.features__memory}>
        <p>Select capacity</p>
        <div className={style.features__memoryBlock}>
          {product?.capacityAvailable.map((capacity) => {
            const lowerCCapacity = capacity.toLocaleLowerCase();

            return (
              <Link
                to={`/product/${type}/${product.namespaceId}-${lowerCCapacity}-${activeColor}`}
                key={capacity}
                onClick={() => setActiveMemory(lowerCCapacity)}
                className={cn(style.features__memoryItem, {
                  [style.activeMemory]: activeMemory === lowerCCapacity,
                })}
              >
                {capacity}
              </Link>
            );
          })}
        </div>
      </div>

      <div className={style.features__priceBlock}>
        <div className={style.features__price}>
          {product?.priceDiscount ? (
            <>
              <p className={style.features__productionPrice}>
                ${product?.priceDiscount}
              </p>
              <p className={style.features__crossedOutPrice}>
                ${product?.priceRegular}
              </p>
            </>
          ) : (
            <p className={style.features__productionPrice}>
              ${product?.priceRegular}
            </p>
          )}
        </div>

        <div className={style.features__cartBlock}>
          <AddToCard
            added={cartStorageList.some(
              (cartProduct) => cartProduct.name === product.id,
            )}
            id={product.id}
            category={type || ''}
          />

          <AddToFavorite
            added={favoritesStorageList.includes(product.id)}
            id={product.id}
          />
        </div>

        <div className={style.features__briefInfBlock}>
          <div>
            <p>Screen</p>
            <p>Resolution</p>
            <p>Processor</p>
            <p>RAM</p>
          </div>
          <div>
            <p className={style.features__specValue}>{product?.screen}</p>
            <p className={style.features__specValue}>{product?.resolution}</p>
            <p className={style.features__specValue}>{product?.processor}</p>
            <p className={style.features__specValue}>{product?.ram}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
