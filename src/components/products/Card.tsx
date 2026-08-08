import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/types/global';

export default function ProductCard({ product }: { product: Product }) {
  const thumbnail = product.variants.images?.[0]?.url || '/placeholder.webp';

  return (
    <div className="group border-accent-3 relative flex h-full cursor-pointer flex-col gap-4 overflow-hidden rounded-xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={thumbnail}
          alt={product.name}
          fill
          className="scale-90 object-contain transition-transform duration-600 group-hover:scale-100"
        />

        {product.variants.availability.isOnStock ? (
          <div className="bg-primary/90 absolute z-10 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm">
            In Stock
          </div>
        ) : (
          <div className="absolute z-10 rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold text-white shadow-sm">
            Out of Stock
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-secondary text-lg leading-tight font-bold">{product.name}</h3>
        <div className="flex flex-wrap gap-1">
          {product.categories?.slice(0, 3).map((category) => (
            <span
              key={category.id}
              className="border-primary text-secondary-800 items-center rounded-md border px-2 py-1 text-xs font-medium"
            >
              {category.name}
            </span>
          ))}
        </div>

        <p className="text-secondary mt-4 line-clamp-2 text-sm">{product.description}</p>

        <div className="mt-6 mt-auto flex items-center justify-between pt-4">
          <span className="text-secondary text-md text-xl font-bold whitespace-nowrap">
            {product.variants.price}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="border-primary text-primary hover:bg-primary flex items-center justify-center rounded-md border-2 bg-white px-4 py-1.5 text-sm font-bold transition-colors hover:text-white"
          >
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
}
