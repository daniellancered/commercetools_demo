import { mapProducts } from '@/utils/mapProducts';
import { httpApiRoot } from './BuildClient';
import { Product } from '@/types/global';

export async function getProducts(): Promise<Product[]> {
  const response = await httpApiRoot
    .products()
    .get({
      queryArgs: {
        limit: 20,
        staged: false,
        expand: ['masterData.current.categories[*]','productType'],
      },
    })
    .execute();

  return mapProducts(response.body.results);
}
