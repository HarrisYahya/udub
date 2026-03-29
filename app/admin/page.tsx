"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProductManager from "./components/ProductManager";
import CategoryManager from "./components/CategoryManager";

export default function AdminPage() {
  const [tab, setTab] = useState<"products" | "categories">("products");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar tab={tab} setTab={setTab} />

      <div className="flex-1 p-6">
        {tab === "products" && <ProductManager />}
        {tab === "categories" && <CategoryManager />}
      </div>
    </div>
  );
}