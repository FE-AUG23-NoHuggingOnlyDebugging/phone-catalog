'use strict';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './ProductDetailsPage.module.scss';
import { Description } from './Components/DescriptionDetails/DescriptionDetails';
import { Features } from './Components/FeaturesBlock/Features';
import { Gallery } from './Components/GalleryBlock/Gallery';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import ProductsSlider from '../../components/ProductsSlider/ProductsSlider';
import { ProductDetailsSkeleton } from '../../components/ProductDetailsSkeleton/ProductDetailsSkeleton';
import { GoBackButton } from '../../components/GoBackButton';
import {
  fetchRecommended,
  selectRecommended,
  selectRecommendedLoadingStatus,
} from '../../store/recommendedSlice';
import { useAppSelector, useThunkDispatch } from '../../store/hooks';
import {
  fetchProductDetail,
  selectProductDetail,
  selectProductDetailLoadingStatus,
} from '../../store/productDetailSlice';
export const ProductDetailsPage = () => {
  const { productId, type } = useParams();
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeMemory, setActiveMemory] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const recommended = useAppSelector(selectRecommended);
  const isLoadingSlider = useAppSelector(selectRecommendedLoadingStatus);
  const dispatchRecommended = useThunkDispatch();

  const product = useAppSelector(selectProductDetail);
  const paginateLoadingStatus = useAppSelector(
    selectProductDetailLoadingStatus,
  );
  const dispatchProductDetail = useThunkDispatch();

  const [mainImage, setMainImage] = useState(product?.images[0]);

  useEffect(() => {
    if (type && productId) {
      const query = {
        type: type || '',
        id: productId || '',
      };
      dispatchProductDetail(fetchProductDetail(query));

      setMainImage(product?.images[0] || '');
      setActiveColor(product?.color || '');
      setActiveMemory(product?.capacity.toLocaleLowerCase() || '');
      setIsError(paginateLoadingStatus === 'error');
    }
  }, [productId]);

  useEffect(() => {
    dispatchRecommended(fetchRecommended(productId || ''));
  }, []);

  const specs = [
    { name: 'Screen', value: product?.screen },
    { name: 'Resolution', value: product?.resolution },
    { name: 'Processor', value: product?.processor },
    { name: 'RAM', value: product?.ram },
    { name: 'Built in memory', value: product?.capacity },
    { name: 'Camera', value: product?.camera },
    { name: 'Zoom', value: product?.zoom },
    { name: 'Cell', value: product?.cell.join(', ') },
  ];

  return (
    <>
      <GoBackButton />
      {paginateLoadingStatus === 'loading' && <ProductDetailsSkeleton />}
      {isError && <NotFoundPage />}
      {product && !isError && paginateLoadingStatus !== 'loading' && (
        <>
          <section className={style.product}>
            <div>
              <h1 className={style.mainTitle}>{product?.name}</h1>

              <article className={style.productOverview}>
                <Gallery
                  product={product}
                  setMainImage={setMainImage}
                  mainImage={mainImage || product?.images[0]}
                />

                <Features
                  product={product}
                  productId={productId}
                  setActiveColor={setActiveColor}
                  setActiveMemory={setActiveMemory}
                  activeColor={activeColor}
                  activeMemory={activeMemory}
                  type={type}
                />
              </article>

              <Description specs={specs} descriptions={product?.description} />
            </div>
          </section>

          <ProductsSlider
            title="You may also like"
            products={recommended}
            status={isLoadingSlider === 'loading'}
          />
        </>
      )}
    </>
  );
};
