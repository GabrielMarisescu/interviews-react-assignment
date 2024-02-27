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
    const { data, isFetching, error } = useQuery<Cart, Error>({
        queryKey: [ProductPageApiQueryKeys.CART],
        queryFn: () => getCart(),
    })

    return {
        cart: data,
        isLoading: data?.loading,
        error,
        isFetching,
    }
}

export default useGetCart
