import { Product } from '@/types/global';
import { mapProductProjections } from '@/utils/mapProductProjection';
import { mapProducts } from '@/utils/mapProducts';

import { httpApiRoot } from './BuildClient';
import { getCategory } from './categories';

export async function getProducts(page = 1, limit = 8, categoryKey?: string) {
  let categoryId: string | undefined;

  if (categoryKey) {
    const category = await getCategory(categoryKey);
    categoryId = category.id;
  }

  const response = await httpApiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit,
        offset: (page - 1) * limit,
        staged: false,
        ...(categoryId && {
          filter: [`categories.id:"${categoryId}"`],
        }),
        expand: ['categories[*]'],
      },
    })
    .execute();

  return {
    products: mapProductProjections(response.body.results),
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
