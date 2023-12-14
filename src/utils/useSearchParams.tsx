import { useSearchParams as useRouterSearchParams } from 'react-router-dom';

export const useSearchParams = () => {
  const [searchParams, setSearchParams] = useRouterSearchParams();

  const page = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage') || 16;
  const sort = searchParams.get('sort') || '';

  return {
    searchParams,
    setSearchParams,
    perPage,
    page,
    sort,
  };
};

