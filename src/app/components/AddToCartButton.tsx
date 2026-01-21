"use client";

import { useCartStore } from "@/store/cartStore";

// 상품 타입 정의 (새로 추가됨)
interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description?: string;
}

// props 타입 변경: any -> Product
export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // 링크 이동 방지
    
    // 필요한 데이터만 골라서 넘기기
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: 1, // 초기 수량
    });
    
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