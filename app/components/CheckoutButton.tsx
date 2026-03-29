"use client";

import { useCart, CartItem } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function CheckoutButton() {
  const { cart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const phone = "252619084107"; // 🔥 replace with your WhatsApp number

    let message = "🛒 *New Order*%0A%0A";
    let total = 0;

    cart.forEach((item: CartItem) => {
      message += `• ${item.name} x${item.quantity} - $${item.price * item.quantity}%0A`;
      total += item.price * item.quantity;
    });

    message += `%0A💰 *Total: $${total}*`;

    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
  };

  // ✅ hide if cart empty
  if (cart.length === 0) return null;

  return (
    <button
      onClick={handleCheckout}
      className="
        flex items-center gap-2
        bg-green-600 hover:bg-green-500
        text-white text-sm
        px-4 py-2
        rounded-full shadow-md
        transition
      "
    >
      <ShoppingCart className="w-4 h-4" />
      <span>Checkout</span>
    </button>
  );
}