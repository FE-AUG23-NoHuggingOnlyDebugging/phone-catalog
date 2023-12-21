'use strict';

export const loadUserCart = async () => {
  try {
    const res = await fetch(
      'https://fe-aug23-nohuggingonlydebugging-phone.onrender.com/user/cart',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        credentials: 'include',
      },
    );

    const data = await res.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log((error as Error).message);
  }
};
