import styles from './pagination.module.scss';

import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { usePagination, DOTS } from './utils/usePagination';
import './pagination.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useSearchParams } from '../../utils/useSearchParams';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onStateUpload: (isLoading: boolean) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  pageSize,
  onStateUpload,
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { page } = useSearchParams();
  const currentPage = Number(page) || 1;

  const [siblingCount, setSiblingCount] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setSiblingCount(
        window.innerWidth > 500 ? 2 : window.innerWidth > 420 ? 1 : 0,
      );
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const paginationRange =
    usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
    }) || [];

  const updatePage = (newPage: number) => {
    queryParams.set('page', String(newPage));
    return `?${queryParams.toString()}`;
  };

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={styles.pagination}>
      {currentPage !== 1 ? <Link
        to={
          currentPage < 2
            ? updatePage(currentPage)
            : updatePage(currentPage - 1)
        }
        className={styles.pagination__item}
        onClick={() => onStateUpload(true)}
      >
        <img
          className={styles.arrow__left}
          src={process.env.PUBLIC_URL + '/img/icons/arrow.png'}
          alt="prev"
        />
      </Link> : <span
        className={cn(styles.pagination__item, {
          [styles.pagination__disabled]: currentPage === 1,
        })}
      >
        <img
          className={styles.arrow__left}
          src={process.env.PUBLIC_URL + '/img/icons/arrow.png'}
          alt="prev"
        />
      </span>}
      <div className={styles.pagination__list}>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={index} className={styles.pagination__item}>
                &#8230;
              </li>
            );
          }

          return (
            <Link
              to={updatePage(Number(pageNumber))}
              key={index}
              className={cn(styles.pagination__item, {
                [styles.pagination__selected]: pageNumber === currentPage,
              })}
              onClick={() => onStateUpload(true)}
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>
      {currentPage !== lastPage ? <Link
        to={
          currentPage === lastPage
            ? updatePage(currentPage)
            : updatePage(currentPage + 1)
        }
        className={styles.pagination__item}
        onClick={() => onStateUpload(true)}
      >
        <img src={process.env.PUBLIC_URL + '/img/icons/arrow.png'} alt="next"/>
      </Link> : <span
        className={cn(styles.pagination__item, {
          [styles.pagination__disabled]: currentPage === lastPage,
        })}
      >
<!-- // <<<<<<< light-dark-theme -->
<!--         <img
          className={styles.arrow__right}
          src={process.env.PUBLIC_URL + '/img/icons/arrow.png'}
          alt="next"
        />
      </Link> -->
<!-- // ======= -->
        <img src={process.env.PUBLIC_URL + '/img/icons/arrow.png'} alt="next"/>
      </span>}
<!-- //>>>>>>> main -->
    </ul>
  );
};

export default Pagination;
