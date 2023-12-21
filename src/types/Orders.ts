import { ProductOrder } from './ProductOrder';

export type Orders = {
  createdAt: string;
  id: string;
  products: ProductOrder[];
};
