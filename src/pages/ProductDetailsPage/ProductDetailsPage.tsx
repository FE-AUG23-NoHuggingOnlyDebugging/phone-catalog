'use strict';

import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import style from './ProductDetailsPage.module.scss';
import { Description } from './Components/DescriptionDetails/DescriptionDetails';
import { Features } from './Components/FeaturesBlock/Features';
import { Gallery } from './Components/GalleryBlock/Gallery';
import axios from 'axios';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { Spinner } from '../../components/Loader/Spinner';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { type } = useParams();
  const location = useLocation().pathname.split('/')[1];

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [mainImage, setMainImage] = useState(product?.images[0]);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeMemory, setActiveMemory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  console.log(location);

  useEffect(() => {
    setIsError(false);

    axios
      .get<ProductDetails>(
        `https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/${type}/${productId}`,
      )
      .then((res) => {
        setProduct(res.data);
        setMainImage(res.data.images[0]);
        setActiveColor(res.data.color);
        setActiveMemory(res.data.capacity.toLocaleLowerCase());
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

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
      {isLoading && <Spinner />}
      {isError && <NotFoundPage />}
      {product && !isError && !isLoading && (
        <section className={style.product}>
          <div>
            <h1 className={style.mainTitle}>{product?.name}</h1>

            <article className={style.productOverview}>
              <Gallery
                product={product}
                setMainImage={setMainImage}
                mainImage={mainImage}
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
      )}
    </>
  );
};
