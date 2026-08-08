'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useCart } from '@/context/CartContext';

export default function Header() {
  const pathname = usePathname();
  const { openCart } = useCart();

  const isCartPage = pathname === '/cart';

  return (
    <header className="border-accent-2 bg-background/90 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold">
          Commercetools Demo
        </Link>

        <div className="flex gap-8">
          <nav className="text-secondary-600 hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/products" className="hover:text-primary transition-colors">
              Products
            </Link>

            <Link href="/collections" className="hover:text-primary transition-colors">
              Collections
            </Link>
          </nav>

          <button
            type="button"
            onClick={!isCartPage ? openCart : () => {}}
            className="bg-primary hover:bg-primary-600 shadow-primary/20 cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors"
          >
            Cart
          </button>
        </div>
      </div>
    </header>
  );
}
