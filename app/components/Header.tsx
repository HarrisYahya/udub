"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { cart } = useCart();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        <h1 className="text-xl font-bold text-gray-800">
          MyStore
        </h1>

        <button
          onClick={() => router.push("/cart")}
          className="relative p-2 rounded-full hover:bg-gray-100 transition"
        >
          <ShoppingCart className="w-6 h-6 text-gray-700" />

          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}