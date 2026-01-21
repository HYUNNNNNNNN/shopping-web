"use client";

import { useCartStore } from "@/store/cartStore";

export default function AddToCartButton({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    alert("장바구니에 담겼습니다.");
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="w-full bg-black text-white py-4 text-sm tracking-[0.15em] hover:bg-gray-800 transition-colors uppercase"
    >
      Add to Cart
    </button>
  );
}