"use client";

import ProductCard from "./ProductCard";

type Props = {
  products: any[];
  visibleCount: number;
  setVisibleCount: (fn: (prev: number) => number) => void;
  total: number;
};

export default function ProductGrid({
  products,
  visibleCount,
  setVisibleCount,
  total,
}: Props) {
  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛍️ All Products</h2>

      {products.length === 0 && (
        <p className="text-gray-500 text-center">No products found.</p>
      )}

      {/* GRID */}
      <div
        className="grid gap-6 
          grid-cols-2 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5"
      >
        {products.slice(0, visibleCount).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* LOAD MORE */}
      {visibleCount < total && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-400 transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}