import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const startPage = Math.max(2, currentPage - 2);
  const endPage = Math.min(totalPages - 1, currentPage + 2);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  const showLeftEllipsis = startPage > 2;
  const showRightEllipsis = endPage < totalPages - 1;

  return (
    <div className="border-accent-3 mt-20 mb-40 flex items-center justify-between rounded-full border bg-white px-6 py-3 shadow-sm">
      <Link
        href={`/products?page=${Math.max(1, currentPage - 1)}`}
        className={`flex items-center gap-2 ${
          currentPage === 1 ? 'pointer-events-none opacity-40' : 'hover:text-primary'
        }`}
      >
        <span className="-mt-1 text-2xl">‹</span>
        <span className="hidden pr-2 inline">Previous</span>
      </Link>

      <div className="hidden items-center gap-2 sm:flex">
        <Link
          href="/products?page=1"
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            currentPage === 1 ? 'bg-primary text-white' : 'hover:bg-gray-100'
          }`}
        >
          1
        </Link>

        {showLeftEllipsis && <span>...</span>}

        {pages.map((page) => (
          <Link
            key={page}
            href={`/products?page=${page}`}
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              page === currentPage ? 'bg-primary text-white' : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </Link>
        ))}

        {showRightEllipsis && <span>...</span>}

        {totalPages > 1 && (
          <Link
            href={`/products?page=${totalPages}`}
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              currentPage === totalPages ? 'bg-primary text-white' : 'hover:bg-gray-100'
            }`}
          >
            {totalPages}
          </Link>
        )}
      </div>

      <Link
        href={`/products?page=${Math.min(totalPages, currentPage + 1)}`}
        className={`flex items-center gap-2 ${
          currentPage === totalPages ? 'pointer-events-none opacity-40' : 'hover:text-primary'
        }`}
      >
        <span className="hidden pl-2 inline">Next</span>
        <span className="-mt-1 text-2xl leading-none">›</span>
      </Link>
    </div>
  );
}
