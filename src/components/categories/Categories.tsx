import Link from 'next/link';

import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';
import { ProductCategory } from '@/types/global';

export default function Categories({ categories }: { categories: ProductCategory[] }) {
  return (
    <Container>
      <div className="mb-30 flex flex-col">
        <PageHeader
          title="Categories"
          description="Explore our curated collections for every room in your home."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.key}`}
              className="group border-accent-3 rounded-xl border p-6 transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-accent-2"
            >
              <h2 className="text-secondary group-hover:text-primary text-xl font-semibold">
                {category.name}
              </h2>
              <p className="text-secondary mt-2 text-sm">Explore {category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
