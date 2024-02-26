import { create } from 'zustand'

import { devtools } from 'zustand/middleware'
import { CategoriesEnum, Product } from './interfaces'

interface ProductPageStoreInterface {
    category: CategoriesEnum
    setCategory: (newCategory: CategoriesEnum) => void
    search: string
    setSearch: (newSearch: string) => void
    // addItemToCart: (product: Product, quantity: number) => void
    products: Product[]
    setProducts: (newProducts: Product[]) => void
}

export const useProductPageStore = create<ProductPageStoreInterface>()(
    devtools(
        (set) => ({
            products: [],
            setProducts: (newProducts: Product[]) => {
                set(() => ({ products: [...newProducts] }))
            },
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
            // addItemToCart: (product: Product, quantity: number) =>
            //     set((prev) => ({
            //         cart: {
            //             items: [
            //                 ...prev.cart.items,
            //                 {
            //                     ...product,
            //                     itemsInCart: product.itemsInCart + quantity,
            //                 },
            //             ],
            //             totalItems: quantity,
            //             totalPrice: quantity,
            //         },
            //     })),
        }),
        { name: 'ProductPageStore' }
    )
)
