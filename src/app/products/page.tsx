import ProductList from '@/components/products/ProductList';
import { getProducts } from '@/lib/commercetools/products';
import { Product } from '@/types/global';

export default async function ProductsPage() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error(error);
  }

  return <ProductList products={products} />;
}
