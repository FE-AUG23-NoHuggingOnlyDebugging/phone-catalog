import cn from 'classnames';
import style from './ProductDetailsSkeleton.module.scss';
import ProductLoader from '../ProductLoader/ProductLoader';

export const ProductDetailsSkeleton = () => {
  return (
    <>
      <div className={style.productLoader}>
        <div>
          <div className={cn(style.productLoader__title, style.skeleton)}></div>

          <div className={style.productLoader__overview}>
            <div className={style.productLoader__galleryBlock}>
              <div className={style.productLoader__leftSide}>
                <div
                  className={cn(
                    style.productLoader__leftSide_img,
                    style.skeleton,
                  )}
                ></div>
                <div
                  className={cn(
                    style.productLoader__leftSide_img,
                    style.skeleton,
                  )}
                ></div>
                <div
                  className={cn(
                    style.productLoader__leftSide_img,
                    style.skeleton,
                  )}
                ></div>
                <div
                  className={cn(
                    style.productLoader__leftSide_img,
                    style.skeleton,
                  )}
                ></div>
              </div>

              <div className={style.prodictLoader__rightSide}>
                <div
                  className={cn(
                    style.productLoader__rightSide_img,
                    style.skeleton,
                  )}
                />
              </div>
            </div>

            <div className={style.productLoader__features}>
              <div className={style.productLoader__colors}>
                <div
                  className={cn(
                    style.productLoader__colorsText,
                    style.skeleton,
                  )}
                />
                <div className={style.productLoader__colorsBlock}>
                  <div className={style.productLoader__colorItemWrapper}>
                    <div
                      className={cn(
                        style.productLoader__colorItem,
                        style.skeleton,
                      )}
                    />
                  </div>
                  <div className={style.productLoader__colorItemWrapper}>
                    <div
                      className={cn(
                        style.productLoader__colorItem,
                        style.skeleton,
                      )}
                    />
                  </div>
                  <div className={style.productLoader__colorItemWrapper}>
                    <div
                      className={cn(
                        style.productLoader__colorItem,
                        style.skeleton,
                      )}
                    />
                  </div>
                  <div className={style.productLoader__colorItemWrapper}>
                    <div
                      className={cn(
                        style.productLoader__colorItem,
                        style.skeleton,
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className={style.productLoader__memory}>
                <div
                  className={cn(
                    style.productLoader__memoryText,
                    style.skeleton,
                  )}
                />
                <div className={style.productLoader__memoryBlock}>
                  <div
                    className={cn(
                      style.productLoader__memoryItem,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__memoryItem,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__memoryItem,
                      style.skeleton,
                    )}
                  />
                </div>
              </div>

              <div className={style.productLoader__priceBlock}>
                <div
                  className={cn(style.productLoader__price, style.skeleton)}
                />
              </div>

              <div className={style.productLoader__cartBlock}>
                <div
                  className={cn(style.productLoader__cart, style.skeleton)}
                />
                <div className={cn(style.productLoader__fav, style.skeleton)} />
              </div>

              <div className={style.productLoader__briefInfBlock}>
                <div className={style.productLoader__row}>
                  <div
                    className={cn(
                      style.productLoader__specValue,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specValue,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specValue,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specValue,
                      style.skeleton,
                    )}
                  />
                </div>
                <div className={style.productLoader__row}>
                  <div
                    className={cn(
                      style.productLoader__specValue,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specValue,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specValue,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specValue,
                      style.skeleton,
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={style.productLoader__Description}>
            <div className={style.productLoader__descriptionBlock}>
              <div
                className={cn(
                  style.productLoader__descriptionBlock_title,
                  style.skeleton,
                )}
              />

              <div className={style.productLoader__descriptionBlock_article}>
                <div
                  className={cn(
                    style.productLoader__descriptionBlock_subTitle,
                    style.skeleton,
                  )}
                />
                <div
                  className={cn(
                    style.productLoader__descriptionBlock_text,
                    style.skeleton,
                  )}
                />{' '}
              </div>

              <div className={style.productLoader__descriptionBlock_article}>
                <div
                  className={cn(
                    style.productLoader__descriptionBlock_subTitle,
                    style.skeleton,
                  )}
                />
                <div
                  className={cn(
                    style.productLoader__descriptionBlock_text,
                    style.skeleton,
                  )}
                />
              </div>

              <div className={style.productLoader__descriptionBlock_article}>
                <div
                  className={cn(
                    style.productLoader__descriptionBlock_subTitle,
                    style.skeleton,
                  )}
                />
                <div
                  className={cn(
                    style.productLoader__descriptionBlock_text,
                    style.skeleton,
                  )}
                />
              </div>
            </div>

            <div>
              <div
                className={cn(
                  style.productLoader__descriptionBlock_title,
                  style.skeleton,
                )}
              />

              <div className={style.productLoader__specsBlock}>
                <div className={style.productLoader__row}>
                  <div
                    className={cn(
                      style.productLoader__specName,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specName,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specName,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specName,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specName,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specName,
                      style.skeleton,
                    )}
                  />
                </div>

                <div className={style.productLoader__row}>
                  <div
                    className={cn(
                      style.productLoader__specName,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specName,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specName,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specName,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specName,
                      style.skeleton,
                    )}
                  />
                  <div
                    className={cn(
                      style.productLoader__specName,
                      style.skeleton,
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductLoader type={'slider'} />
    </>
  );
};
