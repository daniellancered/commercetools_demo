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

        <div className="flex justify-center px-2">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.key}`}
                className="group border-accent-3 hover:bg-accent-3 aspect-square w-full max-w-50 text-center rounded-xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-full flex-col justify-center">
                  <h2 className="text-secondary group-hover:text-primary text-xl font-semibold">
                    {category.name}
                  </h2>

                  <p className="text-secondary mt-2 text-sm">Explore {category.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
