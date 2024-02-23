import { create } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

interface ProductPageStoreInterface {
    bears: number
    increase: (by: number) => void
}

export const useProductPageStore = create<ProductPageStoreInterface>()(
    devtools(
        persist(
            (set) => ({
                bears: 0,
                increase: (by) => set((state) => ({ bears: state.bears + by })),
            }),
            { name: 'ProductPageStore' }
        )
    )
)
