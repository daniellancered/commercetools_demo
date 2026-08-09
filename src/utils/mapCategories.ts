import type { Category as CtpCategory } from '@commercetools/platform-sdk';

import type { ProductCategory } from '@/types/global';

export function mapCategories(categories: CtpCategory[]): ProductCategory[] {
  const LOCALE = 'en-US';
  return categories.map((category) => ({
    id: category.id,
    key: category.key ?? '',
    name: category.name[LOCALE],
    slug: category.slug?.[LOCALE] ?? '',
  }));
}
