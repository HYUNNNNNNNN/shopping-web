import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// export를 붙여서 다른 파일에서도 쓸 수 있게 합니다.
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  // any -> CartItem으로 변경
  addItem: (product: CartItem) => void; 
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      // product 타입을 CartItem으로 변경
      addItem: (product: CartItem) => {
        const { items } = get();
        // ... (나머지 로직은 그대로) ...
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
          // 이미 quantity가 포함된 product가 들어오므로 그대로 추가
          set({
            items: [...items, product], 
          });
        }
      },

      removeItem: (id) =>
        set({ items: get().items.filter((item) => item.id !== id) }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);