import { Product } from '@/types/global';
import { mapProducts } from '@/utils/mapProducts';

import { httpApiRoot } from './BuildClient';

export async function getProducts(page = 1, limit = 8) {
  const response = await httpApiRoot
    .products()
    .get({
      queryArgs: {
        limit,
        offset: (page - 1) * limit,
        staged: false,
        expand: ['masterData.current.categories[*]'],
      },
    })
    .execute();

  return {
    products: mapProducts(response.body.results),
    total: response.body.total ?? 0,
  };
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
