'use strict';

import { useEffect, useState } from 'react';
type Err = {
  error: string;
};

export const usePageError = (

  initial: Err | null,
): [Err | null, (b: Err | null) => void] => {

  const [error, setError] = useState(initial);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timerId = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  return [error, setError];
};
