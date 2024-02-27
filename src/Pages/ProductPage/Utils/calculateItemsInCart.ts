import { CartItem } from '../interfaces'

export const calculateItemsInCart = (
    productId: number,
    cartItems: CartItem[] | undefined
): number => {
    if (cartItems) {
        const matchingProduct = cartItems.find(
            ({ product }) => product.id === productId
        )

        if (matchingProduct) {
            return matchingProduct.quantity
        }
    }

    return 0
}
