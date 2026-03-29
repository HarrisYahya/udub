"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import CategoryScroller from "./components/CategoryScroller";
import FeaturedSection from "./components/FeaturedSection";
import ProductGrid from "./components/ProductGrid";


type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  featured?: boolean;
  category?: string;
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*");
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const featuredProducts = filteredProducts.filter((p) => p.featured);
  const normalProducts = filteredProducts.filter((p) => !p.featured);

  const categories: string[] = [
    "All",
    ...Array.from(
      new Set(products.map((p) => p.category).filter((c): c is string => !!c))
    ),
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <SearchBar search={search} setSearch={setSearch} />
      <CategoryScroller categories={categories} category={category} setCategory={setCategory} />

      {!loading && featuredProducts.length > 0 && (
        <FeaturedSection products={featuredProducts} />
      )}

      {!loading && (
        <ProductGrid
          products={normalProducts} // pass full list; slicing handled in ProductGrid
          visibleCount={visibleCount}
          setVisibleCount={setVisibleCount}
          total={normalProducts.length}
        />
      )}
    </main>
  );
}