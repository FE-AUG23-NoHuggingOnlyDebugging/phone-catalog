// 'use strict';
// import React, { useEffect, useState } from 'react';
// import cn from 'classnames';
// import { useSearchParams } from '../../utils/useSearchParams';
// import styles from './ProductPage.module.scss';
// import ProductList from '../../components/ProductList/ProductList';
// import { useAppSelector, useThunkDispatch } from '../../store/hooks';
// import Dropdown from '../../components/Dropdown/Dropdown';
// import { useParams } from 'react-router-dom';
// import { CategoriesTypes } from '../../types/Categories';
// import {
//   fetchPagination,
//   selectPagination,
//   selectPaginationLoadingStatus,
// } from '../../store/paginationSlice';
// import { CheckoutModal } from '../../components/CheckoutModal';

// export const ProductPage = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const { page, perPage, sort, setSearchParams } = useSearchParams();
//   const { type } = useParams();

//   const [isModalShown, setIsModalShown] = useState(false);

//   const API_URL = `https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products/${type}`;

//   useEffect(() => {
//     const query = {
//       type: type || '',
//       sort: sort,
//       page: page,
//       perPage: perPage,
//     };
//     dispatchPaginate(fetchPagination(query));
//   }, [page, perPage, sort, type]);

//   useEffect(() => {
//     setIsLoading(true);
//     if (paginateLoadingStatus !== 'loading') {
//       setIsLoading(false);
//     }
//   }, [type, paginateLoadingStatus]);

//   const handleSearchParams = (setKey: string, value: string) => {
//     setSearchParams((searchParams) => {
//       searchParams.set(setKey, value);
//       return searchParams;
//     });
//   };

//   function checkItem(value: string, setBy: string, arr: string[][]): string {
//     const current = setBy === 'sort' ? 'Newest' : '16';

//     if (!value) {
//       return current;
//     }
//     if (value && !arr.map(([x]) => x).includes(value)) {
//       handleSearchParams(setBy, current);
//       return current;
//     }
//     const el = arr.find(([x]) => x === value);
//     if (el) {
//       return el[1];
//     }
//     return '';
//   }

//   const listSort = [
//     ['age', 'Newest'],
//     ['title', 'Alphabetically'],
//     ['price', 'Price'],
//   ];

//   const listPerPage = [
//     ['4', '4'],
//     ['8', '8'],
//     ['16', '16'],
//     ['all', 'all'],
//   ];

//   const pageTitle = (type?: string) => {
//     let currenType;

//     switch (type) {
//     case 'phones':
//       currenType = CategoriesTypes.Phones;
//       break;
//     case 'tablets':
//       currenType = CategoriesTypes.Tablets;
//       break;
//     case 'accessories':
//       currenType = CategoriesTypes.Accessories;
//       break;

//     default:
//       break;
//     }

//     return currenType;
//   };

//   const handleShowModal = () => {
//     setIsModalShown(true);
//   };

//   const handleCloseClick = () => {
//     setIsModalShown(false);
//   };

//   return (
//     <>
//       <div
//         className={cn(styles.wrapper, styles.catalog, {
//           [styles.wrapper__isModal]: isModalShown,
//         })}
//       >
//         <section className={styles.catalog__info}>
//           <h2 className={styles.catalog__title}>{pageTitle(type)}</h2>
//           <p className={styles.catalog__modelCount}>
//             {!isLoading ? `${total} models` : 'Counting models...'}
//           </p>
//         </section>

//         <section className={styles.catalog__filters}>
//           <div>
//             <p className={styles.catalog__filters_title}>Sort by</p>
//             <Dropdown
//               list={listSort}
//               currentItem={checkItem(sort || '', 'sort', listSort)}
//               setOn={'sort'}
//               onHandle={handleSearchParams}
//             />
//           </div>
//           <div>
//             <p className={styles.catalog__filters_title}>Items on page</p>
//             <Dropdown
//               list={listPerPage}
//               currentItem={checkItem(
//                 perPage.toString() || '',
//                 'perPage',
//                 listPerPage,
//               )}
//               setOn={'perPage'}
//               onHandle={handleSearchParams}
//               rootClassName={'set-width'}
//             />
//           </div>
//         </section>
//         <section>
//           <ProductList
//             products={products.records}
//             infoPage={products.info}
//             status={isLoading}
//             onStatus={setIsLoading}
//             showModal={handleShowModal}
//           />
//         </section>
//       </div>

//       {isModalShown && (
//         <CheckoutModal
//           status="registerRequired"
//           handleCloseClick={handleCloseClick}
//         />
//       )}
//     </>
//   );
// };

'use strict';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useSearchParams } from '../../utils/useSearchParams';
import styles from './ProductPage.module.scss';
import ProductList from '../../components/ProductList/ProductList';
import { useAppSelector, useThunkDispatch } from '../../store/hooks';
import Dropdown from '../../components/Dropdown/Dropdown';
import { useParams } from 'react-router-dom';
import { CategoriesTypes } from '../../types/Categories';
import { CheckoutModal } from '../../components/CheckoutModal';

import {
  fetchPagination,
  selectPagination,
  selectPaginationLoadingStatus,
} from '../../store/paginationSlice';

export const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { page, perPage, sort, setSearchParams } = useSearchParams();
  const { type } = useParams();

  const [isModalShown, setIsModalShown] = useState(false);

  // const API_URL = `https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/products/${type}`;

  const products = useAppSelector(selectPagination);
  const paginateLoadingStatus = useAppSelector(selectPaginationLoadingStatus);
  const dispatchPaginate = useThunkDispatch();

  useEffect(() => {
    const query = {
      type: type || '',
      sort: sort,
      page: page,
      perPage: perPage,
    };
    dispatchPaginate(fetchPagination(query));
  }, [page, perPage, sort, type]);

  useEffect(() => {
    setIsLoading(true);
    if (paginateLoadingStatus !== 'loading') {
      setIsLoading(false);
    }
  }, [type, paginateLoadingStatus]);

  const handleSearchParams = (setKey: string, value: string) => {
    setSearchParams((searchParams) => {
      searchParams.set(setKey, value);
      return searchParams;
    });
  };

  function checkItem(value: string, setBy: string, arr: string[][]): string {
    const current = setBy === 'sort' ? 'Newest' : '16';

    if (!value) {
      return current;
    }
    if (value && !arr.map(([x]) => x).includes(value)) {
      handleSearchParams(setBy, current);
      return current;
    }
    const el = arr.find(([x]) => x === value);
    if (el) {
      return el[1];
    }
    return '';
  }

  const listSort = [
    ['age', 'Newest'],
    ['title', 'Alphabetically'],
    ['price', 'Price'],
  ];

  const listPerPage = [
    ['4', '4'],
    ['8', '8'],
    ['16', '16'],
    ['all', 'all'],
  ];

  const pageTitle = (type?: string) => {
    let currenType;

    switch (type) {
    case 'phones':
      currenType = CategoriesTypes.Phones;
      break;
    case 'tablets':
      currenType = CategoriesTypes.Tablets;
      break;
    case 'accessories':
      currenType = CategoriesTypes.Accessories;
      break;

    default:
      break;
    }

    return currenType;
  };

  const handleShowModal = () => {
    setIsModalShown(true);
  };

  const handleCloseClick = () => {
    setIsModalShown(false);
  };

  return (
    <>
      <div
        className={cn(styles.wrapper, styles.catalog, {
          [styles.wrapper__isModal]: isModalShown,
        })}
      >
        <section className={styles.catalog__info}>
          <h2 className={styles.catalog__title}>{pageTitle(type)}</h2>
          <p className={styles.catalog__modelCount}>
            {!isLoading && products.info !== null
              ? `${products.info.totalRecords} models`
              : 'Counting models...'}
          </p>
        </section>

        <section className={styles.catalog__filters}>
          <div>
            <p className={styles.catalog__filters_title}>Sort by</p>
            <Dropdown
              list={listSort}
              currentItem={checkItem(sort || '', 'sort', listSort)}
              setOn={'sort'}
              onHandle={handleSearchParams}
            />
          </div>
          <div>
            <p className={styles.catalog__filters_title}>Items on page</p>
            <Dropdown
              list={listPerPage}
              currentItem={checkItem(
                perPage.toString() || '',
                'perPage',
                listPerPage,
              )}
              setOn={'perPage'}
              onHandle={handleSearchParams}
              rootClassName={'set-width'}
            />
          </div>
        </section>
        <section>
          <ProductList
            products={products.records}
            infoPage={products.info}
            status={isLoading}
            onStatus={setIsLoading}
            showModal={handleShowModal}
          />
        </section>
      </div>

      {isModalShown && (
        <CheckoutModal
          status="registerRequired"
          handleCloseClick={handleCloseClick}
        />
      )}
    </>
  );
};
