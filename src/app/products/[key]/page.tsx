import Image from 'next/image';
import { notFound } from 'next/navigation';

import AddToCartButton from '@/components/cart/AddToCart';
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

    return (
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl border">
            <Image
              src={product.variants.images?.[0]?.url || '/placeholder.webp'}
              alt={product.name}
              fill
              className="object-contain p-8"
            />
          </div>

          <div className="flex flex-col">
            <div className="mb-3 flex flex-wrap gap-2">
              {product.categories?.map((category) => (
                <span
                  key={category.id}
                  className="border-primary text-secondary rounded-md border px-2 py-1 text-xs font-medium"
                >
                  {category.name}
                </span>
              ))}
            </div>

            <h1 className="text-secondary text-3xl font-bold">{product.name}</h1>

            <p className="text-secondary mt-4 text-3xl font-bold">{product.variants.price}</p>

            <div className="mt-6">
              {product.variants.availability.isOnStock ? (
                <span className="bg-primary/90 rounded-full px-3 py-1 text-sm font-semibold text-white">
                  In Stock
                </span>
              ) : (
                <span className="rounded-full bg-red-500/90 px-3 py-1 text-sm font-semibold text-white">
                  Out of Stock
                </span>
              )}
            </div>

            <p className="text-secondary mt-8 leading-relaxed">{product.description}</p>

            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

        <section className="mt-16 border-t pt-10">
          <h2 className="text-secondary text-2xl font-bold">Product Details</h2>
        </section>
      </main>
    );
  } catch {
    notFound();
  }
}
