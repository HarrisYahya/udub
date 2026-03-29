import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  featured?: boolean;
  discount?: number;
};

type Props = { product: Product; featured?: boolean };

export default function ProductCard({ product, featured }: Props) {
  const { addToCart } = useCart();
  const router = useRouter();

  const finalPrice =
    product.discount && product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 
      flex flex-col h-full overflow-hidden group
      ${featured ? "border-2 border-yellow-400" : "border border-gray-100"}`}
    >
      {/* IMAGE */}
      <div
        className="w-full h-32 sm:h-36 md:h-40 overflow-hidden cursor-pointer"
        onClick={() => router.push(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow p-3">
        <h3 className="text-sm md:text-base font-semibold line-clamp-1 cursor-pointer"
            onClick={() => router.push(`/product/${product.id}`)}
        >
          {product.name}
        </h3>

        {product.description && (
          <p className="text-gray-500 text-xs md:text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex flex-col">
            {product.discount && product.discount > 0 ? (
              <>
                <span className="text-xs text-gray-400 line-through">
                  ${product.price}
                </span>
                <span className="text-sm md:text-lg font-bold text-green-600">
                  ${finalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-sm md:text-lg font-bold text-green-600">
                ${product.price}
              </span>
            )}
          </div>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: finalPrice,
              })
            }
            className="text-[10px] md:text-sm bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-400 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}