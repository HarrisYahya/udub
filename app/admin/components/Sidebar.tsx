"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Sidebar({ tab, setTab }: any) {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between h-screen">
      <div>
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
      </div>

      <button
        onClick={logout}
        className="w-full text-left p-2 rounded bg-red-500 text-white mt-4 hover:bg-red-600 transition"
      >
        Logout
      </button>
    </aside>
  );
}