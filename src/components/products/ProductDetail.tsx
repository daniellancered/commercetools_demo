'use client';

import { useState } from 'react';

import Container from '@/components/Container';
import AddToCartButton from '@/components/cart/AddToCart';
import ProductGallery from '@/components/products/ProductGallery';
import { Product, ProductVariant } from '@/types/global';

export default function ProductDetail({ product }: { product: Product }) {
  const allVariants = [product.mainVariant, ...(product.variants ?? [])];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.mainVariant);

  return (
    <Container>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-2">
          <ProductGallery images={selectedVariant.images} productName={product.name} />

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-1">
              {product.categories?.map((category) => (
                <span
                  key={category.id}
                  className="border-primary text-secondary rounded-md border px-2 py-1 text-xs font-medium"
                >
                  {category.name}
                </span>
              ))}
            </div>

            <h1 className="text-secondary text-3xl font-bold">{product.name}</h1>
            <p className="text-secondary text-3xl font-bold">${selectedVariant.price}</p>
            <p className="text-secondary leading-relaxed">{product.description}</p>

            {product.variants?.length && (
              <div className="flex flex-col gap-2">
                <p className="font-semibold">Select Variant</p>

                <div className="flex gap-2">
                  {allVariants.map((variant) => {
                    return (
                      <button
                        key={variant.key}
                        type="button"
                        onClick={() => setSelectedVariant(variant)}
                        className={`rounded-md border px-4 py-2 ${
                          selectedVariant.sku === variant.sku
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300'
                        }`}
                      >
                        {variant.sku}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <AddToCartButton product={product} variant={selectedVariant} />

            <div className="mt-10 flex flex-col gap-2">
              <h2 className="text-secondary text-2xl font-bold">Product Details</h2>

              {selectedVariant.attributes && (
                <table className="w-full border-collapse">
                  <tbody>
                    {Object.entries(selectedVariant.attributes).map(([name, value]) => (
                      <tr key={name} className="border-b">
                        <th className="w-1/2 py-3 pr-4 text-left align-baseline font-semibold">
                          {name}
                        </th>

                        <td className="py-3">
                          {value.includes('\n') ? (
                            <ul className="space-y-1">
                              {value.split('\n').map((item, index) => (
                                <li key={index} className="flex gap-2">
                                  <span>{item.replace(/^- /, '').trim()}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            value.replace(/^- /, '').trim()
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
