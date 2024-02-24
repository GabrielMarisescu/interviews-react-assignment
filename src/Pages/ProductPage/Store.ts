import { create } from 'zustand'

import { devtools } from 'zustand/middleware'

interface ProductPageStoreInterface {
    page: number
    increasePage: () => void
}

export const useProductPageStore = create<ProductPageStoreInterface>()(
    devtools(
        (set) => ({
            page: 0,
            increasePage: () => set((state) => ({ page: state.page + 1 })),
        }),
        { name: 'ProductPageStore' }
    )
)
