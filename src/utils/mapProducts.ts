import type { Product as CtpProduct } from '@commercetools/platform-sdk';

import type { Product } from '@/types/global';

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
      variants: {
        id: masterVariant.id,
        sku: masterVariant.sku,
        key: masterVariant.key,
        price: `$${(
          masterVariant.prices!.find((price) => price.country === 'US')!.value.centAmount / 100
        ).toFixed(2)}`,
        images: masterVariant.images?.map((image) => ({
          url: image.url,
          width: image.dimensions.w,
          height: image.dimensions.h,
        })),
        availability: {
          isOnStock: masterVariant!.availability!.isOnStock ?? false,
          availableQuantity: masterVariant!.availability!.availableQuantity ?? 0,
        },
      },
    };
  });
}
