'use client';

import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart } = useCart();

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => {
    const price = item.product.variants.price;
    return sum + Number(price.replace('$', '')) * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={closeCart}
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold">Your Cart</h2>

          <button
            type="button"
            onClick={closeCart}
            className="text-2xl"
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
                <div
                  key={item.product.id}
                  className="flex gap-4 border-b pb-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.product.variants.price} × {item.quantity}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-sm text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-5">
            <div className="mb-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="w-full rounded-md bg-black py-3 text-white">
              Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}