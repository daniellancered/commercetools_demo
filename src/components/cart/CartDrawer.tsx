'use client';

import Link from 'next/link';

import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart } = useCart();

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => {
    return sum + Number(item.variant.price) * item.quantity;
  }, 0);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30" onClick={closeCart} />

      <div className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold">Your Cart</h2>

          <button
            type="button"
            onClick={closeCart}
            className="cursor-pointer text-2xl"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.variant.key} className="flex gap-4 border-b pb-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={item.variant.images?.[0]?.url || '/placeholder.webp'}
                      alt={item.product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <h3 className="font-semibold">{item.product.name}</h3>

                    {item.variant.attributes?.Color && (
                      <p className="text-sm text-gray-500">
                        Color: {item.variant.attributes.Color}
                      </p>
                    )}

                    <p className="mt-1 text-sm text-gray-500">
                      ${item.variant.price} × {item.quantity}
                    </p>

                    <p className="mt-auto font-semibold">
                      ${(Number(item.variant.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.variant.key!)}
                    className="cursor-pointer self-start text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="flex flex-col gap-3 border-t p-5">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link href="/cart" onClick={closeCart}>
              <div className="bg-tertiary flex w-full justify-center rounded-md py-3 font-semibold text-white hover:opacity-90">
                View Cart
              </div>
            </Link>
            <button
              type="button"
              className="w-full cursor-pointer rounded-md bg-black py-3 font-semibold text-white hover:opacity-90"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
