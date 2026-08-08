import Image from 'next/image';
import Link from 'next/link';

import { CartItem } from '@/types/global';

import Container from '../Container';
import PageHeader from '../PageHeader';

interface CartProps {
  items: CartItem[];
  removeFromCart: (variantKey: string) => void;
  increaseQuantity: (variantKey: string) => void;
  decreaseQuantity: (variantKey: string) => void;
  updateQuantity: (variantKey: string, quantity: number) => void;
}

export default function Cart({
  items,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
}: CartProps) {
  const total = items.reduce((sum, item) => sum + Number(item.variant.price) * item.quantity, 0);

  if (items.length === 0) {
    return (
      <Container>
        <div className="flex h-[70vh] flex-col items-center justify-center gap-8 px-6 py-16 text-center">
          <h1 className="text-secondary text-3xl font-bold">Your Cart</h1>
          <p className="text-gray-500">Your cart is empty.</p>
          <Link
            href="/products"
            className="bg-primary inline-block w-fit rounded-md px-6 py-3 font-semibold text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col justify-center">
        <div className="mx-auto flex flex-col justify-center lg:w-[70vw]">
          <PageHeader title="Your Cart" />

          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-col">
                {items.map((item) => (
                  <div key={item.variant.key} className="border-accent-3 flex gap-5 border-b py-6">
                    <div className="border-accent-3 relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border">
                      <Image
                        src={item.variant.images?.[0]?.url || '/placeholder.webp'}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-1">
                      <Link
                        href={`/products/${item.product.key}`}
                        className="cursor-pointer text-lg font-semibold hover:underline"
                      >
                        {item.product.name}
                      </Link>

                      <p className="text-lg">${item.variant.price}</p>
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
                    </div>

                    <div className="flex flex-col justify-center">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.variant.key!)}
                        className="cursor-pointer rounded-md border border-red-500 p-1 text-sm text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-accent-3 flex h-full flex-grow flex-col justify-between gap-4 rounded-xl border p-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div>
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="grid grid-cols-[2fr_auto_1fr] gap-3 text-sm"
                    >
                      <span className="min-w-0">{item.product.name}</span>
                      <span className="text-end whitespace-nowrap">x{item.quantity}</span>
                      <span className="text-end whitespace-nowrap">
                        ${(Number(item.variant.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm">
                  <span>Items: </span>
                  <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between border-t py-4 text-lg font-bold">
                  <span>Shipping Fee: </span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between border-t py-4 pb-10 text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  className="bg-primary w-full cursor-pointer rounded-md py-3 font-semibold text-white"
                >
                  Checkout
                </button>

                <Link
                  href="/products"
                  className="block text-center text-sm text-gray-500 hover:underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
