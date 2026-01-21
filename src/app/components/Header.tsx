"use client"; // 필수!

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore'; // 방금 만든 스토어 import
import { useEffect, useState } from 'react';

export default function Header() {
  // Hydration 에러 방지용 (서버/클라이언트 불일치 해결)
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 총 상품 개수 계산
  const totalItems = mounted 
    ? items.reduce((acc, item) => acc + item.quantity, 0) 
    : 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 bg-white/50 backdrop-blur-md border-b border-gray-200/50 transition-all">
      
      <Link href="/" className="text-xl font-bold tracking-[0.2em] uppercase hover:text-gray-600 transition-colors">
        Lulu's Archive
      </Link>

      <nav className="hidden md:flex space-x-8 text-sm font-light tracking-widest text-gray-500">
        <Link href="/" className="hover:text-black transition-colors">SHOP</Link>
        <Link href="#" className="hover:text-black transition-colors">ABOUT</Link>
        <Link href="#" className="hover:text-black transition-colors">JOURNAL</Link>
      </nav>

      <div className="flex items-center space-x-6">
        <button className="text-sm font-light tracking-widest hover:underline decoration-1 underline-offset-4">
          SEARCH
        </button>
        {/* 장바구니 버튼 수정 */}
        <Link href="/cart" className="relative group">
          <span className="text-sm font-light tracking-widest hover:text-gray-600">
            CART ({totalItems})
          </span>
        </Link>
      </div>

    </header>
  );
}