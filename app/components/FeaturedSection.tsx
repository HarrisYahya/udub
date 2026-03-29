import ProductCard from "./ProductCard";

type Props = {
  products: any[];
};

export default function FeaturedSection({ products }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">⭐ Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} featured />
        ))}
      </div>
    </section>
  );
}