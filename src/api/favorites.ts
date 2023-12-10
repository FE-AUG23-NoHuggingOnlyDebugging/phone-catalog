'use strict';

import { Phone } from '../types/Phone';
import { client } from '../utils/http/fetchClient';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const get = () => {
  return client.get<Phone>(`${BASE_URL}/favorites`);
};

export const favorites = {
  get,
};
