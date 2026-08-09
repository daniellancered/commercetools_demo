import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/products/Card';
import { Product } from '@/types/global';

interface ProductListProps {
  products: Product[];
  category?: string;
}

export default function ProductList({ products, category }: ProductListProps) {
  const formattedCategory = category
    ? category
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Our Products';

  return (
    <Container>
      <PageHeader
        title={formattedCategory ?? 'Our Products'}
        description="Discover our hand-picked selection of high-quality furnitures and home decor, designed to bring warmth and texture to any space."
      />
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10 xl:grid-cols-4 mb-20">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[40vh] w-full flex-col items-center justify-center gap-1 py-8 text-center">
          <h3 className="text-secondary text-lg font-bold">No products found</h3>
          <p className="text-secondary/80 text-sm">Please check later.</p>
        </div>
      )}
    </Container>
  );
}
