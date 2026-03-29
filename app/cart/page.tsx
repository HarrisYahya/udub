"use client";

import { useCart } from "../context/CartContext";
import { sendWhatsAppOrder } from "@/lib/checkout";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, increase, decrease, remove } = useCart();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 p-4">
        <p className="text-gray-500 text-lg">Your cart is empty 🛒</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-400 transition"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-grow">
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-lg">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => decrease(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    -
                  </button>

                  <span className="px-2">{item.quantity}</span>

                  <button
                    onClick={() => increase(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>

                  <button
                    onClick={() => remove(item.id)}
                    className="ml-4 text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <span className="font-bold text-green-600 text-lg mt-2 sm:mt-0">
              ${item.price * item.quantity}
            </span>
          </div>
        ))}

        {/* TOTAL */}
        <div className="flex justify-between font-bold text-xl mt-4 border-t pt-4">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* CHECKOUT BUTTON */}
        <button
          onClick={() => sendWhatsAppOrder(cart)}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-2xl hover:bg-green-500 transition font-semibold text-lg"
        >
          Checkout via WhatsApp
        </button>

        {/* CONTINUE SHOPPING */}
        <button
          onClick={() => router.push("/")}
          className="mt-3 w-full bg-gray-200 py-3 rounded-2xl hover:bg-gray-300 transition font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}