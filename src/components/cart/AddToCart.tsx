'use client';

import { ShoppingCart } from 'lucide-react';

import { useCart } from '@/context/CartContext';
import { Product, ProductVariant } from '@/types/global';

interface AddToCartButtonProps {
  product: Product;
  variant: ProductVariant;
  type: 'card' | 'full';
}

export default function AddToCartButton({ product, variant, type }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      disabled={!variant.availability.isOnStock}
      onClick={() => addToCart(product, variant)}
      className="bg-primary w-full cursor-pointer rounded-md px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {variant.availability.isOnStock ? (
        type === 'full' ? (
          <div className='flex gap-4 justify-center'>
            <ShoppingCart className="h-6 w-6" />
            Add to cart
          </div>
        ) : (
          <ShoppingCart className="h-6 w-6" />
        )
      ) : (
        'Out of stock'
      )}
    </button>
  );
}
