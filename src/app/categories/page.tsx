import { notFound } from 'next/navigation';

import Categories from '@/components/categories/Categories';
import { getCategories } from '@/lib/commercetools/categories';

export default async function CategoriesPage() {
  try {
    const categories = await getCategories();
    return <Categories categories={categories} />;
  } catch {
    notFound();
  }
}
