'use client';

import { useCart } from '@/context/CartContext';
import { Product } from '@/types/global';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const isInStock = product.variants.availability.isOnStock;

  return (
    <button
      type="button"
      disabled={!isInStock}
      onClick={() => addToCart(product)}
      className="bg-primary disabled:text-secondary/40 disabled:bg-accent-3 w-full cursor-pointer rounded-md px-4 py-1.5 font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed"
    >
      {isInStock ? 'Add to cart' : 'SOLD OUT'}
    </button>
  );
}
