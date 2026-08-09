import type {
  ProductVariant as CtpProductVariant,
  ProductProjection,
} from '@commercetools/platform-sdk';

import type { ProductVariant } from '@/types/global';
import { mapAttributes } from '@/utils/mapAttributes';

export function mapVariant(
  variant: ProductProjection['masterVariant'],
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
    availability: mapAvailability(variant.availability),
    ...(variant.attributes?.length && {
      attributes: mapAttributes(variant.attributes, locale),
    }),
  };
}

function mapAvailability(availability: CtpProductVariant['availability']) {
  if (!availability) {
    return {
      isOnStock: false,
      availableQuantity: 0,
    };
  }

  if ('isOnStock' in availability) {
    return {
      isOnStock: availability.isOnStock ?? false,
      availableQuantity: availability.availableQuantity ?? 0,
    };
  }

  if ('channels' in availability && availability.channels) {
    const channels = Object.values(availability.channels);
    return {
      isOnStock: channels.some((channel) => channel.isOnStock),
      availableQuantity: channels.reduce(
        (total, channel) => total + (channel.availableQuantity ?? 0),
        0,
      ),
    };
  }

  return {
    isOnStock: false,
    availableQuantity: 0,
  };
}
