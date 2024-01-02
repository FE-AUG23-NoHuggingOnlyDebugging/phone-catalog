'use strict';

export const SyncUserDataWithServer = async (
  favorites: string,
  type: string,
) => {
  try {
    await fetch(
      `https://phone-catalog-api-docker.onrender.com/user/${type}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        credentials: 'include',
        body: favorites,
      },
    );
  } catch (error) {
    console.log((error as Error).message);
    alert('Failed to sync with the server');
  }
};
