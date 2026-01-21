import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 장바구니에 담길 상품 타입 정의
interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      // 상품 담기 함수 (이미 있으면 수량만 +1, 없으면 새로 추가)
      addItem: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
          });
        }
      },

      // 상품 삭제 함수
      removeItem: (id) =>
        set({ items: get().items.filter((item) => item.id !== id) }),

      // 장바구니 비우기
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // 브라우저 로컬 스토리지에 저장될 이름
    }
  )
);