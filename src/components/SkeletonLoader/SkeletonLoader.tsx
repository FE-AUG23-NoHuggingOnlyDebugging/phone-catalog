import ContentLoader from 'react-content-loader';

import './SkeletonLoader.scss';

export const SkeletonLoader = () => (
  <div className="test">
    <ContentLoader
      speed={2}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="test2"
    >
      <rect rx="2" ry="2" className="image" />
      <rect
        y="220" rx="2" ry="2"
        width="208" height="42" className="title" />
      <rect
        y="270" rx="2" ry="2"
        className="price" />
      <rect
        y="325" rx="2" ry="2"
        className="spec" />
      <rect
        y="348" rx="2" ry="2"
        className="spec" />
      <rect
        y="371" rx="2" ry="2"
        className="spec" />
      <rect
        y="402" rx="2" ry="2"
        className="cart" />
      <rect
        x="168"
        y="402"
        rx="2"
        ry="2"
        className="fav" />

    </ContentLoader>
  </div>
);
