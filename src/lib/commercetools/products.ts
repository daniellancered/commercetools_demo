import { Product } from '@/types/global';
import { mapProducts } from '@/utils/mapProducts';

import { httpApiRoot } from './BuildClient';

export async function getProducts(): Promise<Product[]> {
  const response = await httpApiRoot
    .products()
    .get({
      queryArgs: {
        limit: 20,
        staged: false,
        expand: ['masterData.current.categories[*]'],
      },
    })
    .execute();

  return mapProducts(response.body.results);
}

export async function getProduct(key: string): Promise<Product> {
  const response = await httpApiRoot
    .products()
    .withKey({ key })
    .get({
      queryArgs: {
        staged: false,
        expand: ['masterData.current.categories[*]', 'productType'],
      },
    })
    .execute();

  return mapProducts([response.body])[0];
}
