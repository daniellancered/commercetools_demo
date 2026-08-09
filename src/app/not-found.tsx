import Link from 'next/link';

import { Armchair } from 'lucide-react';

import Container from '@/components/Container';

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-50 text-center">
        <div className="bg-accent-3 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <Armchair className="text-primary h-10 w-10" />
        </div>

        <p className="text-primary text-sm font-semibold tracking-widest uppercase">404</p>

        <h1 className="text-secondary mt-2 text-4xl font-bold md:text-5xl">Page not found</h1>

        <p className="text-secondary-600 mt-4 max-w-md text-lg">
          {`Sorry, we couldn't find the page you're looking for. It
            may have been moved or no longer exists.`}
        </p>

        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="bg-primary rounded-md px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Back to Home
          </Link>

          <Link
            href="/products"
            className="border-primary text-primary hover:bg-accent-3 rounded-md border px-6 py-3 font-semibold transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </Container>
  );
}
