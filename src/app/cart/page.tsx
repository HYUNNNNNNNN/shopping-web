"use client";

import { useCartStore } from "@/store/cartStore"; // 경로가 다르다면 ../../store/cartStore 로 수정하세요
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  // Hydration 에러 방지 (클라이언트 로드 후 렌더링)
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, clearCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // 로딩 깜빡임 방지

  // 총 금액 계산
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const formatPrice = (price: number) => 
    new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);

  return (
    <main className="min-h-screen bg-chessboard pt-32 pb-20 px-4 flex flex-col items-center">
      
      <h1 className="text-3xl font-light tracking-[0.3em] uppercase mb-16 text-gray-800">
        Your Collection
      </h1>

      {items.length === 0 ? (
        // 장바구니가 비었을 때
        <div className="text-center space-y-6">
          <p className="text-gray-400 font-light tracking-widest">비어있음. 공허함.</p>
          <Link 
            href="/" 
            className="inline-block border-b border-black pb-1 hover:text-gray-500 transition-colors tracking-widest text-sm"
          >
            SHOPPING CONTINUE
          </Link>
        </div>
      ) : (
        // 장바구니 아이템 리스트
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* 왼쪽: 상품 목록 (2칸 차지) */}
          <div className="md:col-span-2 space-y-12">
            {items.map((item) => (
              <div key={item.id} className="flex items-start gap-6 group">
                {/* 이미지 */}
                <div className="relative w-24 h-32 bg-gray-200 shrink-0 overflow-hidden">
                  <Image 
                    src={item.image_url || '/main-artwork.png'} // 이미지가 없으면 메인 아트워크 사용
                    alt={item.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* 정보 */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-light tracking-wide">{item.name}</h3>
                  <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                  <p className="text-xs text-gray-400 tracking-widest">QTY: {item.quantity}</p>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-400/70 hover:text-red-600 underline underline-offset-4 mt-2 transition-colors"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 오른쪽: 결제 요약 (1칸 차지, 스크롤 따라오게 sticky) */}
          <div className="md:col-span-1 h-fit md:sticky md:top-32 p-8 bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm">
            <h2 className="text-sm font-bold tracking-[0.2em] mb-6 uppercase">Summary</h2>
            
            <div className="flex justify-between items-center mb-4 text-sm font-light">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between items-center mb-8 text-sm font-light">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="border-t border-gray-300 pt-4 flex justify-between items-center mb-8">
              <span className="font-medium">Total</span>
              <span className="text-lg font-medium">{formatPrice(totalPrice)}</span>
            </div>

            <button 
              onClick={() => alert('결제 기능은 아직 꿈속에 있습니다.')}
              className="w-full bg-black text-white py-4 text-xs tracking-[0.2em] hover:bg-gray-800 transition-colors uppercase"
            >
              Checkout
            </button>
            
            <button 
              onClick={clearCart}
              className="w-full mt-4 text-xs text-gray-400 hover:text-black underline underline-offset-2 transition-colors"
            >
              CLEAR ALL
            </button>
          </div>

        </div>
      )}
    </main>
  );
}