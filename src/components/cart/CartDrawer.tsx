'use client';

import Link from 'next/link';

import { CreditCard, ShoppingCart } from 'lucide-react';

import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
  } = useCart();

  const total = items.reduce((sum, item) => {
    return sum + Number(item.variant.price) * item.quantity;
  }, 0);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="border-accent-3 flex items-center justify-between border-b p-5">
          <h2 className="text-secondary flex items-center gap-2 text-xl font-bold">
            Your Cart
            {itemCount > 0 && (
              <span className="bg-primary flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </h2>

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
            <div className="flex w-full flex-col items-center justify-center gap-4 py-100">
              <ShoppingCart className="h-6 w-6" />

              <p>Your cart is empty.</p>
              <Link
                href="/products"
                onClick={closeCart}
                className="bg-accent-1 hover:bg-primary w-fit gap-3 rounded-md p-3 font-semibold text-white transition-colors duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.variant.key} className="border-accent-3 flex gap-4 border-b pb-4">
                  <div className="border-accent-3 h-20 w-20 shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={item.variant.images?.[0]?.url || '/placeholder.webp'}
                      alt={item.product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-1.5">
                    <h3 className="text-sm font-semibold">{item.product.name}</h3>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.variant.key!)}
                        className="border-accent-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border hover:bg-gray-100"
                      >
                        −
                      </button>

                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const quantity = Number(e.target.value);

                          if (quantity >= 1) {
                            updateQuantity(item.variant.key!, quantity);
                          }
                        }}
                        className="border-accent-3 h-7 w-12 rounded-md border text-center text-sm"
                      />

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.variant.key!)}
                        className="border-accent-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-semibold">
                      ${(Number(item.variant.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.variant.key!)}
                      className="cursor-pointer text-sm text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-accent-3 flex flex-col gap-3 border-t p-5">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link href="/cart" onClick={closeCart}>
              <div className="bg-accent-1 hover:bg-primary flex w-full justify-center gap-3 rounded-md py-3 font-semibold text-white transition-colors duration-300">
                <ShoppingCart className="h-6 w-6" />
                View Cart
              </div>
            </Link>

            <button
              type="button"
              className="bg-accent-2 hover:bg-secondary flex w-full cursor-pointer justify-center gap-3 rounded-md py-3 font-semibold text-white transition-colors duration-300"
            >
              <CreditCard className="h-6 w-6" />
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
