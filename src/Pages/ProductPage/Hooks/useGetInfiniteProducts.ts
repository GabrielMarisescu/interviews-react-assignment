import { useInfiniteQuery } from '@tanstack/react-query'
import { ProductPageApiQueryKeys, fetchProducts } from '../api'
import { FullProducts } from '../interfaces'
/**
 * @function
 * @param page ,number
 * @param limit, number
 *
 */

function useGetInfiniteProducts() {
    const { data, hasNextPage, fetchNextPage, isLoading, isFetching, error } =
        useInfiniteQuery<FullProducts, Error>({
            initialPageParam: 0,
            queryKey: [ProductPageApiQueryKeys.PRODUCTS],
            queryFn: ({ pageParam }) => fetchProducts({ pageParam }),
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
