import { create } from 'zustand'

import { devtools } from 'zustand/middleware'
import { CategoriesEnum } from './interfaces'

interface ProductPageStoreInterface {
    category: CategoriesEnum
    setCategory: (newCategory: CategoriesEnum) => void
    search: string
    setSearch: (newSearch: string) => void
}

export const useProductPageStore = create<ProductPageStoreInterface>()(
    devtools(
        (set) => ({
            category: CategoriesEnum.All as const,

            setCategory: (newCategory: CategoriesEnum) =>
                set(() => {
                    // Incase we will need multiple categories
                    // const uniqueCategories = [
                    // ...new Set([...prev.categories, newCategory]),
                    // ...new Set([newCategory]),
                    // ]
                    return { category: newCategory }
                }),

            search: '',

            setSearch: (newSearch: string) =>
                set(() => ({ search: newSearch })),
        }),
        { name: 'ProductPageStore' }
    )
)
