import Link from "next/link"; 
import { createClient } from '@supabase/supabase-js';
import Image from "next/image";

// Supabase 클라이언트 생성
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 금액 포맷팅 함수 (예: 85,000원)
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
};

export default async function Home() {
  // DB에서 상품 데이터 가져오기
  const { data: products } = await supabase.from('products').select('*').order('id');

  return (
    <main className="min-h-screen bg-chessboard flex flex-col items-center relative">
      
      {/* --- 기존 Hero Section (쇼핑몰 대문) --- */}
      <section className="w-full flex flex-col items-center text-center pt-32 pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] mb-2 uppercase">
          Lulu's 
        </h1>
        <p className="text-sm text-gray-500 tracking-widest uppercase mb-12">
          Surreal Objects Shop
        </p>
        
        {/* 대표 아트워크 (이전 코드 유지) */}
        <div className="relative w-64 h-80 md:w-80 md:h-[28rem] bg-gray-100 rotate-2 shadow-xl mb-10 transition-transform hover:rotate-0 duration-500">
  {/* 기존의 텍스트 div는 지우고 아래 Image 컴포넌트를 넣습니다. */}
  <Image
    src="/images/main-artwork.png" // public 폴더 기준 경로
    alt="Surreal illustration of a girl hugging a giant plant"
    fill
    className="object-cover" // 이미지가 박스에 꽉 차게
    priority // 메인 이미지니까 우선 로딩
  />
</div>
        <p className="text-sm text-gray-500 tracking-widest uppercase mb-12">
          사람과 패션 사이의 균형을 탐구합니다.
        </p>
      </section>


      {/* --- New: Product List Section (상품 진열) --- */}
      <section className="w-full max-w-6xl px-6 pb-32">
        
        {/* 섹션 헤더 */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-300 pb-4">
          <h2 className="text-xl font-light tracking-widest">COLLECTION</h2>
          <span className="text-xs text-gray-500">2026 S/S</span>
        </div>

        {/* 상품 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {products && products.map((product) => (
            <Link 
              href={`/products/${product.id}`} 
              key={product.id} 
              className="group cursor-pointer block" // block 추가
              >
              
              {/* 상품 이미지 영역 */}
              <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden mb-4">
                {product.image_url ? (
                  <Image 
                    src={product.image_url} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out grayscale-[0.3] group-hover:grayscale-0"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">NO IMAGE</div>
                )}
                
                {/* Hover 시 나타나는 장바구니 버튼 (옵션) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="w-full bg-black/80 text-white text-xs py-3 backdrop-blur-sm hover:bg-black transition-colors">
                        ADD TO CART
                    </button>
                </div>
              </div>

              {/* 상품 정보 */}
              <div className="flex flex-col space-y-1">
                <h3 className="text-sm font-medium tracking-wide text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-1">
                    {product.description}
                </p>
                <p className="text-sm font-light text-gray-900 mt-1">
                  {formatPrice(product.price)}
                </p>
              </div>

            </Link>
          ))}
          
          {/* 데이터가 없을 경우 처리 */}
          {(!products || products.length === 0) && (
            <div className="col-span-full text-center py-20 text-gray-400">
              <p>진열된 상품이 없습니다.</p>
            </div>
          )}
        </div>

      </section>

    </main>
  );
}