import { create } from 'zustand'

import { devtools } from 'zustand/middleware'
import { CategoriesEnum } from './interfaces'

interface ProductPageStoreInterface {
    category: CategoriesEnum | null
    changeCategory: (newCategory: CategoriesEnum) => void
    search: string
    changeSearch: (newSearch: string) => void
}

export const useProductPageStore = create<ProductPageStoreInterface>()(
    devtools(
        (set) => ({
            category: null,
            search: '',
            changeCategory: (newCategory: CategoriesEnum) =>
                set(() => {
                    // Incase we will need multiple categories
                    // const uniqueCategories = [
                    // ...new Set([...prev.categories, newCategory]),
                    // ...new Set([newCategory]),
                    // ]
                    return { category: newCategory }
                }),
            changeSearch: (newSearch: string) =>
                set(() => ({ search: newSearch })),
        }),
        { name: 'ProductPageStore' }
    )
)
