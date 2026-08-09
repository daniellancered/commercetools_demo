import type { ProductProjection } from '@commercetools/platform-sdk';

import type { Product } from '@/types/global';
import { mapCategories } from '@/utils/mapCategories';
import { mapVariant } from '@/utils/mapVariant';

export function mapProductProjections(products: ProductProjection[]): Product[] {
  const LOCALE = 'en-US';
  return products.map((product) => ({
    id: product.id,
    key: product.key,
    name: product.name[LOCALE],
    description: product.description?.[LOCALE],
    slug: product.slug[LOCALE],
    categories: mapCategories(
      product.categories.filter((category) => category.obj).map((category) => category.obj!),
    ),
    mainVariant: mapVariant(product.masterVariant, LOCALE),
    ...(product.variants.length && {
      variants: product.variants.map((variant) =>
        mapVariant(variant, LOCALE, product.masterVariant),
      ),
    }),
    ...(product.productType.obj && {
      productType: {
        name: product.productType.obj.name,
      },
    }),
  }));
}
