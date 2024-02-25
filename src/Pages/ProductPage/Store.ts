import { create } from 'zustand'

import { devtools } from 'zustand/middleware'

interface ProductPageStoreInterface {
    category: string
    changeCategory: (newCategory: string) => void
    search: string
    changeSearch: (newSearch: string) => void
}

export const useProductPageStore = create<ProductPageStoreInterface>()(
    devtools(
        (set) => ({
            category: '',
            search: '',
            changeCategory: (newCategory: string) =>
                set(() => ({ category: newCategory })),
            changeSearch: (newSearch: string) =>
                set(() => ({ search: newSearch })),
        }),
        { name: 'ProductPageStore' }
    )
)
