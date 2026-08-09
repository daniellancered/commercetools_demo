'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ShoppingCart, Store } from 'lucide-react';

import Container from '@/components/Container';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const pathname = usePathname();
  const { items, openCart } = useCart();

  const isCartPage = pathname === '/cart';
  const isHome = pathname === '/';
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 flex justify-center backdrop-blur-xl ${
        isHome ? 'text-white' : 'border-accent-3 text-secondary border-b'
      }`}
    >
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold sm:text-xl md:text-3xl">
            <Store className="h-8 w-8" />
            <span className="hidden sm:inline">Commercetools Demo</span>
          </Link>

          <div className="flex gap-8">
            <nav className="text-secondary-600 flex items-center text-lg font-medium sm:gap-6">
              <Link
                href="/products"
                className="hover:text-primary hover:bg-accent-1 rounded-lg p-3 transition-colors hover:text-white"
              >
                Products
              </Link>

              <Link
                href="/categories"
                className="hover:text-primary hover:bg-accent-1 rounded-lg p-3 transition-colors hover:text-white"
              >
                Categories
              </Link>
            </nav>

            <button
              type="button"
              onClick={!isCartPage ? openCart : undefined}
              className="hover:bg-accent-1 relative cursor-pointer rounded-lg p-3 transition-colors hover:text-white"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingCart className="h-6 w-6" />

              {itemCount > 0 && (
                <span className="bg-primary absolute top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
