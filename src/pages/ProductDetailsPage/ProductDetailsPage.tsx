'use strict';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../utils/http/fetchClient';
import { ProductDetails } from '../../types/ProductDetails';
import style from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [mainImage, setMainImage] = useState(product?.images[0]);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeMemory, setActiveMemory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);

    client.get<ProductDetails>(`/products/${productId}`)
      .then((data) => {
        setProduct(data);
        setMainImage(data.images[0]);
        setActiveColor(data.color);
        setActiveMemory(data.capacity.toLocaleLowerCase());
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  },[productId]);

  console.log(activeColor, activeMemory);
  const descriptions = product?.description;

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
      {isLoading && <h1>Loading</h1>}
      {isError && <h1>Error</h1>}
      {(product && !isError && !isLoading) && (
        <section className={style.itemCard}>
          <h1 className={style.mainTitle}>{product?.name}</h1>

          <article className={style.gallery}>
            <div className={style.galleryBlock}>
              <div className={style.galleryBlock__leftSide}>

                {product?.images.map((image) => (
                  <img
                    src={image}
                    key={image}
                    alt='iphone'
                    style={mainImage === image ? { border: '2px solid #000'}: {}}
                    onClick={(event) => {
                      const target = event.target as HTMLImageElement;
                      setMainImage(target.src);
                    }}
                  />
                ))}

              </div>
              <div className={style.galleryBlock__rightSide}>
                <img src={mainImage} alt='iphone' />
              </div>
            </div>

            <div className={style.configure}>
              <div className={style.configure__colors}>
                <p className={style.configure__colorsText}>Available colors</p>
                <div
                  className={style.configure__colorsBlock}
                >
                  {product?.colorsAvailable.map((color) => {
                    console.log(`/products/${product.namespaceId}-${activeMemory}-${activeColor}`);
                    return (
                      <Link
                        to={`/products/${product.namespaceId}-${activeMemory}-${color}`}
                        key={color}
                        className={style.colorItemWrapper}
                        onClick={() => {
                          setActiveColor(color);

                        }}
                        style={productId?.includes(color) ? { border: '2px solid #000'} : {}}
                      >
                        <div
                          style={{backgroundColor: color}}
                          className={style.colorItem}
                        />
                      </Link>
                    );})}
                </div>
              </div>

              <div className={style.configure__memory}>
                <p>Select capacity</p>
                <div className={style.configure__memoryBlock}>
                  {product?.capacityAvailable.map((capacity) => {
                    const lowerCCapacity = capacity.toLocaleLowerCase();

                    return (
                      <Link
                        to={`/products/${product.namespaceId}-${lowerCCapacity}-${activeColor}`}
                        key={capacity}
                        onClick={() => setActiveMemory(lowerCCapacity)}
                        className={cn(style.configure__memoryItem,
                          { [style.activeMemory]: productId?.includes(lowerCCapacity)})}
                      >
                        {capacity}
                      </Link>
                    );})}
                </div>
              </div>

              <div className={style.configure__priceBlock}>
                <div className={style.configure__price}>
                  {product?.priceDiscount
                    ?
                    <>
                      <p
                        className={style.configure__productionPrice}
                      >
                        ${product?.priceDiscount}
                      </p>
                      <p
                        className={style.configure__crossedOutPrice}
                      >
                        ${product?.priceRegular}
                      </p>
                    </>
                    : <p className={style.configure__productionPrice}>
                      ${product?.priceRegular}
                    </p>
                  }
                </div>

                <div className={style.configure__cartBlock}>
                  <div className={style.configure__cart}>Add to cart</div>
                  <div className={style.configure__fav}>
                    <img src={process.env.PUBLIC_URL + '/icons/Favourites(HeartLike).svg'} alt="" />
                  </div>
                </div>

                <div className={style.configure__briefInfBlock}>
                  <div>
                    <p>Screen</p>
                    <p>Resolution</p>
                    <p>Processor</p>
                    <p>RAM</p>
                  </div>
                  <div>
                    <p className={style.configure__specValue}>{product?.screen}</p>
                    <p className={style.configure__specValue}>{product?.resolution}</p>
                    <p className={style.configure__specValue}>{product?.processor}</p>
                    <p className={style.configure__specValue}>{product?.ram}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className={style.description}>
            <div className={style.description__descriptionBlock}>
              <h2 className={style.description__title}>About</h2>

              {descriptions?.map(({ title, text }) => (
                <div key={title} className={style.description__article}>
                  <h3 className={style.description__article__subTitle}>{title}</h3>

                  {Array.isArray(text) ? (
                    text.map((paragraph, i) => (
                      <>
                        <p key={paragraph} className={style.description__article__text}>
                          {paragraph}
                        </p>
                        {i + 1 !== text.length && <br />}
                      </>
                    ))
                  ) : (
                    <p key={text} className={style.description__article__text}>{text}</p>
                  )}
                </div>
              ))}

            </div>
            <div style={{width: '512px'}}>
              <h2 className={style.description__title}>Tech specs</h2>

              <div className={style.description__specsBlock}>
                <div>
                  {specs.map((spec) => (
                    <p
                      className={style.description__specName}
                      key={spec.name}
                    >
                      {spec.name}
                    </p>
                  ))}
                </div>
                <div>
                  {specs.map((spec) => (
                    <p
                      className={style.description__specValue}
                      key={spec.value}
                    >
                      {spec.value}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>
      )}
    </>
  );
};
