'use strict';

import { Phone } from '../types/Phone';
import { client } from '../utils/http/fetchClient';

const BASE_URL = process.env.BASE_URL;

const get = () => {
  return client.get<Phone>(`${BASE_URL}/favorites`);
};

export const favorites = {
  get,
};
