import { createClient } from '@supabase/supabase-js';
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/components/AddToCartButton";

// Supabase 설정
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 가격 포맷 함수
const formatPrice = (price: number) => 
  new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>; // Next.js 15+ 에서는 params가 Promise입니다
}) {
  const { id } = await params;
  
  // DB에서 해당 ID의 상품 하나만 가져오기
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) {
    notFound(); // 상품 없으면 404 페이지로
  }

  return (
    <main className="min-h-screen bg-chessboard flex items-center justify-center py-20 px-4">
      
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        
        {/* 왼쪽: 상품 이미지 (거대하고 몽환적인 느낌) */}
        <div className="relative w-full aspect-[3/4] bg-gray-100 shadow-2xl rotate-1">
           {product.image_url ? (
             <Image
               src={product.image_url}
               alt={product.name}
               fill
               className="object-cover"
               priority
             />
           ) : (
             <div className="absolute inset-0 flex items-center justify-center text-gray-300">NO IMAGE</div>
           )}
        </div>

        {/* 오른쪽: 상품 정보 (고정된 느낌의 타이포그래피) */}
        <div className="flex flex-col h-full justify-center space-y-8">
          
          <div className="space-y-2">
            <p className="text-xs text-gray-500 tracking-[0.2em] uppercase">The Collection</p>
            <h1 className="text-3xl md:text-5xl font-light text-gray-900 tracking-wide">
              {product.name}
            </h1>
          </div>

          <p className="text-gray-600 font-light leading-relaxed max-w-md">
            {product.description}
            <br className="mb-4" />
            <span className="text-sm text-gray-400">
              이 오브제는 당신의 공간에 기묘한 고요함을 가져다줍니다. 
              현실과 꿈 사이의 틈새를 메우는 조각입니다.
            </span>
          </p>

          <div className="pt-8 border-t border-gray-300 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-medium">{formatPrice(product.price)}</span>
              <span className="text-xs text-green-600 border border-green-600 px-2 py-0.5 rounded-full">
                IN STOCK
              </span>
            </div>

            {/* 구매 버튼 */}
            <AddToCartButton product={product} />
            <p className="text-center text-xs text-gray-400 mt-3">
              Free shipping worldwide for surrealists.
            </p>
          </div>

        </div>
 
      </div>
    </main>
  );
}