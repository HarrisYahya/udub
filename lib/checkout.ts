import { CartItem } from "@/app/context/CartContext";

export const sendWhatsAppOrder = (cart: CartItem[]) => {
  if (!cart || cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const phone = "252612345678"; // 🔥 your number

  let message = "🛒 *New Order*%0A%0A";
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    message += `• ${item.name} x${item.quantity} - $${itemTotal}%0A`;
    total += itemTotal;
  });

  message += `%0A💰 *Total: $${total}*`;

  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, "_blank");
};