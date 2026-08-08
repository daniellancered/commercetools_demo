import type { Product as CtpProduct } from '@commercetools/platform-sdk';

import type { Product } from '@/types/global';

import { mapVariant } from './mapVariant';

const LOCALE = 'en-US';

export function mapProducts(products: CtpProduct[]): Product[] {
  return products.map((product) => {
    const { current } = product.masterData;
    const { masterVariant } = current;

    return {
      id: product.id,
      key: product.key,
      name: current.name[LOCALE],
      description: current.description?.[LOCALE],
      slug: current.slug[LOCALE],
      categories: current.categories
        ?.filter((category) => category.obj)
        .map((category) => ({
          id: category.obj!.id,
          key: category.obj!.key ?? '',
          name: category.obj!.name[LOCALE],
          slug: category.obj!.slug[LOCALE],
        })),
      mainVariant: mapVariant(masterVariant, LOCALE),
      ...(current.variants.length && {
        variants: current.variants.map((variant) => mapVariant(variant, LOCALE, masterVariant)),
      }),
      ...(product.productType.obj && {
        productType: {
          name: product.productType.obj.name,
        },
      }),
    };
  });
}
