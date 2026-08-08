import type { ProductVariant as CtpProductVariant } from '@commercetools/platform-sdk';

import type { ProductVariant } from '@/types/global';

import { mapAttributes } from './mapAttributes';

export function mapVariant(
  variant: CtpProductVariant,
  locale: string,
  fallbackVariant?: CtpProductVariant,
): ProductVariant {
  const price =
    variant.prices?.find((price) => price.country === 'US') ??
    fallbackVariant?.prices?.find((price) => price.country === 'US');

  return {
    id: variant.id,
    sku: variant.sku,
    key: variant.key,
    price: (price!.value.centAmount / 100).toFixed(2),
    images: variant.images?.map((image) => ({
      url: image.url,
      width: image.dimensions.w,
      height: image.dimensions.h,
    })),
    availability: {
      isOnStock: variant.availability?.isOnStock ?? false,
      availableQuantity: variant.availability?.availableQuantity ?? 0,
    },
    ...(variant.attributes?.length && {
      attributes: mapAttributes(variant.attributes, locale),
    }),
  };
}
