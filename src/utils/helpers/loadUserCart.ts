'use strict';

export const loadUserCart = async () => {
  try {
    const res = await fetch(
      'https://phone-catalog-api-docker.onrender.com/user/cart',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        credentials: 'include',
      },
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};
