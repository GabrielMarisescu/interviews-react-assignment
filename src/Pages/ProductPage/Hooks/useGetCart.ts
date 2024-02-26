import { useQuery } from '@tanstack/react-query'
import { ProductPageApiQueryKeys, getCart } from '../api'
import { Cart } from '../interfaces'
/**
 * @function
 * Makes a GET to '/cart'
 * NOT IMPLEMENTED
 * @returns cart,error,isLoading,isFetching
 */

function useGetCart() {
    const { data, isLoading, isFetching, error } = useQuery<Cart, Error>({
        queryKey: [ProductPageApiQueryKeys.CART],
        queryFn: () => getCart(),
    })

    return {
        cart: data,
        error,
        isLoading,
        isFetching,
    }
}

export default useGetCart
