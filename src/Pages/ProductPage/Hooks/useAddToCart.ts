import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ProductPageApiQueryKeys, postToCart } from '../api'
import { CartParams } from '../interfaces'

/**
 *
 * @returns - Cart
 * Makes a POST request to '/cart'
 * Invalidates ProductPageApiQueryKeys.CART cache,
 * @function addToCart
 */
const useAddToCart = () => {
    const queryClient = useQueryClient()
    const addToCartMutation = useMutation({
        mutationFn: ({ productId, quantity }: CartParams) =>
            postToCart({ productId, quantity }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [ProductPageApiQueryKeys.CART],
            })
        },
    })

    /**
     * @param productId-
     * @param quantity
     */
    const addToCart = ({ productId, quantity }: CartParams) => {
        addToCartMutation.mutateAsync({ productId, quantity })
    }

    return {
        addToCart,
    }
}

export default useAddToCart
