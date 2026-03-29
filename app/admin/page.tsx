"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/hooks/useAuth";
import Sidebar from "./components/Sidebar";
import ProductManager from "./components/ProductManager";
import CategoryManager from "./components/CategoryManager";
import { useState } from "react";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<"products" | "categories">("products");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p className="text-center py-10">Checking authentication...</p>;
  if (!user) return null; // user will be redirected

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