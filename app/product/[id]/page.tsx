"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useCart } from "@/app/context/CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  discount?: number;
  featured?: boolean;
  category?: string;
};

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const pathname = usePathname();

  // extract product id from the path /product/[id]
  const id = pathname.split("/").pop();

  useEffect(() => {
    if (!id) return;
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (id: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", Number(id))
      .single();

    if (!error) setProduct(data);
    setLoading(false);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!product) return <p className="text-center py-10">Product not found.</p>;

  const finalPrice =
    product.discount && product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  return (
    <main className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        {/* IMAGE */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* INFO */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            {product.category && (
              <p className="text-sm text-gray-500 mb-4">{product.category}</p>
            )}

            {product.description && (
              <p className="text-gray-700 mb-4">{product.description}</p>
            )}

            {product.discount && product.discount > 0 ? (
              <div className="flex items-center gap-2 mb-4">
                <span className="line-through text-gray-400">${product.price}</span>
                <span className="text-xl font-bold text-green-600">${finalPrice.toFixed(2)}</span>
                <span className="text-sm text-red-500">-{product.discount}%</span>
              </div>
            ) : (
              <p className="text-xl font-bold text-green-600 mb-4">${product.price}</p>
            )}
          </div>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: finalPrice,
              })
            }
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-400 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}