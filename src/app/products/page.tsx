import Pagination from '@/components/Pagination';
import ProductList from '@/components/products/ProductList';
import { getProducts } from '@/lib/commercetools/products';

interface ProductsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { page = '1' } = await searchParams;
  const count = 8;
  const currentPage = Math.max(1, Number(page) || 1);
  const { products, total } = await getProducts(currentPage, count);
  const totalPages = Math.ceil(total / count);

  return (
    <>
      <ProductList products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
