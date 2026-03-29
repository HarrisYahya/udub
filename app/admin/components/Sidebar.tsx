"use client";

export default function Sidebar({ tab, setTab }: any) {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">Admin</h2>

      <button
        onClick={() => setTab("products")}
        className={`w-full text-left p-2 rounded mb-2 ${
          tab === "products" ? "bg-gray-200" : ""
        }`}
      >
        Products
      </button>

      <button
        onClick={() => setTab("categories")}
        className={`w-full text-left p-2 rounded ${
          tab === "categories" ? "bg-gray-200" : ""
        }`}
      >
        Categories
      </button>
    </aside>
  );
}