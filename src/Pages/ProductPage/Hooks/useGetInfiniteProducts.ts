import { useInfiniteQuery } from '@tanstack/react-query'
import { ProductPageApiQueryKeys, fetchProducts } from '../api'
import { CategoriesEnum, FullProducts } from '../interfaces'
/**
 * @function
 * @param page ,number
 * @param limit, number
 * @returns Infinite Products as long as the back-end is paginated.
 */

function useGetInfiniteProducts(category: CategoriesEnum, search: string) {
    const categoryParam = category === CategoriesEnum.All ? '' : category
    const { data, hasNextPage, fetchNextPage, isLoading, isFetching, error } =
        useInfiniteQuery<FullProducts, Error>({
            initialPageParam: 0,
            queryKey: [ProductPageApiQueryKeys.PRODUCTS, category, search],
            queryFn: ({ pageParam }) =>
                fetchProducts({
                    pageParam,
                    categoryParam,
                    searchParam: search,
                }),
            getNextPageParam: (lastPage) => {
                if (lastPage.hasMore) {
                    return lastPage.pageParam + 1
                }
                return undefined
            },
        })
    const allProducts = data?.pages.flatMap((page) => page.products) || []

    const productsWithItemsInCart = allProducts.map((product) => ({
        ...product,
        itemsInCart: 0,
    }))
    return {
        products: productsWithItemsInCart,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetching,
    }
}

export default useGetInfiniteProducts
