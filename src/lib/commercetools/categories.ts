import { ProductCategory } from '@/types/global';
import { mapCategories } from '@/utils/mapCategories';

import { httpApiRoot } from './BuildClient';

export async function getCategories(): Promise<ProductCategory[]> {
  const response = await httpApiRoot
    .categories()
    .get({
      queryArgs: {
        limit: 100,
        sort: ['name.en-US asc'],
      },
    })
    .execute();

  return mapCategories(response.body.results);
}

export async function getCategory(key: string) {
  const response = await httpApiRoot.categories().withKey({ key }).get().execute();
  return response.body;
}
