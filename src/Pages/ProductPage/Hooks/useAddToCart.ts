import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductPageApiQueryKeys, postToCart } from '../api'
import { CartParams } from '../interfaces'

/**
 *
 * Makes a POST request to '/cart'
 * @returns addToCart
 */
const useAddToCart = () => {
    const queryClient = useQueryClient()
    const addToCartMutation = useMutation({
        mutationFn: ({ productId, quantity }: CartParams) =>
            postToCart({ productId, quantity }),
        onMutate: () => {
            queryClient.setQueryData(
                [ProductPageApiQueryKeys.CART],
                (prevData: CacheQueryOptions) => {
                    return { ...prevData, loading: true }
                }
            )
        },
        onSettled: () => {
            queryClient.setQueryData(
                [ProductPageApiQueryKeys.CART],
                (prevData: CacheQueryOptions) => {
                    return { ...prevData, loading: false }
                }
            )
            queryClient.invalidateQueries({
                queryKey: [ProductPageApiQueryKeys.CART],
            })
        },
    })

    /**
     * @param productId
     * @param quantity
     * Makes a post to '/cart' with the params.
     * Invalidates the ProductPageApiQueryKeys.CART cache
     */
    const addToCart = ({ productId, quantity }: CartParams) => {
        addToCartMutation.mutateAsync({ productId, quantity })
    }

    return {
        addToCart,
    }
}

export default useAddToCart
