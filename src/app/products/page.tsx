import { notFound } from 'next/navigation';

import Pagination from '@/components/Pagination';
import ProductList from '@/components/products/ProductList';
import { getProducts } from '@/lib/commercetools/products';

interface ProductsPageProps {
  searchParams: Promise<{ page?: string; category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  try {
    const { page = '1', category } = await searchParams;
    const count = 8;
    const currentPage = Math.max(1, Number(page) || 1);
    const { products, total } = await getProducts(currentPage, count, category);
    const totalPages = Math.ceil(total / count);

    return (
      <>
        <ProductList products={products} category={category} />
        <Pagination currentPage={currentPage} totalPages={totalPages} category={category} />
      </>
    );
  } catch {
    notFound();
  }
}
