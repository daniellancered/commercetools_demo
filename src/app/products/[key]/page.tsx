import { notFound } from 'next/navigation';

import ProductDetail from '@/components/products/ProductDetail';
import { getProduct } from '@/lib/commercetools/products';

type ProductPageProps = {
  params: Promise<{
    key: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { key } = await params;

  try {
    const product = await getProduct(key);
    return <ProductDetail product={product} />;
  } catch {
    notFound();
  }
}
