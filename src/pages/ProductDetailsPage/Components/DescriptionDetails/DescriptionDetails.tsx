import style from './DescriptionDetails.module.scss';
import React from 'react';

type description = {
  title: string;
  text: [string];
};

type spec = {
  name: string;
  value: string | undefined;
};

type Props = {
  descriptions: description[] | undefined,
  specs: spec[] | undefined,
};

export const Description: React.FC<Props> = ({descriptions, specs}) => {

  return (
    <article className={style.productDescription}>
      <div className={style.productDescription__descriptionBlock}>
        <h2 className={style.productDescription__title}>About</h2>

        {descriptions?.map(({ title, text }) => (
          <div key={title} className={style.productDescription__article}>
            <h3 className={style.productDescription__article__subTitle}>
              {title}
            </h3>

            {Array.isArray(text) ? (
              text.map((paragraph, i) => (
                <>
                  <p
                    key={paragraph}
                    className={style.productDescription__article__text}
                  >
                    {paragraph}
                  </p>
                  {i + 1 !== text.length && <br />}
                </>
              ))
            ) : (
              <p key={text} className={style.productDescription__article__text}>
                {text}
              </p>
            )}
          </div>
        ))}
      </div>
      <div>
        <h2 className={style.productDescription__title}>Tech specs</h2>

        <div className={style.productDescription__specsBlock}>
          <div>
            {specs?.map((spec) => (
              <p className={style.productDescription__specName} key={spec.name}>
                {spec.name}
              </p>
            ))}
          </div>
          <div>
            {specs?.map((spec) => (
              <p
                className={style.productDescription__specValue}
                key={spec.value}
              >
                {spec.value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
