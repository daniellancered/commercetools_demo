import type { Product as CtpProduct } from '@commercetools/platform-sdk';

import type { ProductAttributes } from '@/types/global';

export function mapAttributes(
  attributes: CtpProduct['masterData']['current']['masterVariant']['attributes'],
  locale: string,
): ProductAttributes {
  const attributeLabels: Record<string, string> = {
    'color-label': 'Color',
    productspec: 'Product Specifications',
    'finish-label': 'Finish',
    productDescription: 'Description',
  };

  const result: ProductAttributes = {};

  for (const attribute of attributes ?? []) {
    const label = attributeLabels[attribute.name];

    if (!label) continue;

    result[label] = attribute.value[locale];
  }

  return result;
}
