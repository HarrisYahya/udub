"use client";

import { useCart } from "../context/CartContext";
import { sendWhatsAppOrder } from "@/lib/checkout";

export default function MiniCart() {
  const { cart, isOpen } = useCart();

  if (!isOpen || cart.length === 0) return null;

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed bottom-5 right-5 w-64 bg-white shadow-lg rounded-xl p-4 border border-gray-200 z-50">
      <h3 className="font-semibold text-lg mb-2">🛒 Cart</h3>

      <div className="max-h-40 overflow-y-auto">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center mb-2"
          >
            <span className="text-sm">
              {item.name} x{item.quantity}
            </span>
            <span className="text-sm font-bold text-green-600">
              ${item.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold">
        <span>Total:</span>
        <span>${total}</span>
      </div>

      <button
        onClick={() => sendWhatsAppOrder(cart)}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition"
      >
        Checkout WhatsApp
      </button>
    </div>
  );
}