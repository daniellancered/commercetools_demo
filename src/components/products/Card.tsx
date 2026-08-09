'use client';

import Image from 'next/image';
import Link from 'next/link';

import AddToCartButton from '@/components/cart/AddToCart';
import { Product } from '@/types/global';

export default function ProductCard({ product }: { product: Product }) {
  const thumbnail = product.mainVariant.images?.[0]?.url || '/placeholder.webp';

  return (
    <div className="group border-accent-3 relative flex h-full flex-col overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/products/${product.key}`}
        className="flex flex-1 cursor-pointer flex-col gap-4 p-6"
      >
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={thumbnail}
            alt={product.name}
            fill
            className="scale-90 object-contain transition-transform duration-300 group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, 25vw"
          />

          {product.mainVariant.availability.isOnStock && (
            <div className="bg-primary/90 absolute z-10 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm">
              In Stock
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <h3 className="text-secondary text-lg font-bold">{product.name}</h3>

          <div className="flex flex-wrap gap-1">
            {product.categories?.slice(0, 3).map((category) => (
              <span
                key={category.id}
                className="border-primary text-secondary-800 rounded-md border px-2 py-1 text-xs font-medium"
              >
                {category.name}
              </span>
            ))}
          </div>

          <p className="text-secondary mt-2 line-clamp-2 text-sm">{product.description}</p>
        </div>
      </Link>

      <div className="mt-auto flex items-center justify-between">
        <Link href={`/products/${product.key}`} className="w-full flex-1 px-6 pb-6">
          <span className="text-secondary h-full text-[1.5rem] font-bold">
            ${product.mainVariant.price}
          </span>
        </Link>

        <div className="mr-5 mb-6">
          <AddToCartButton product={product} variant={product.mainVariant} type='card'/>
        </div>
      </div>
    </div>
  );
}
