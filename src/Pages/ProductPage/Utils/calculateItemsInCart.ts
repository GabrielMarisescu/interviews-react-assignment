import { CartItems } from '../interfaces'

export const calculateItemsInCart = (
    productId: number,
    cartItems: CartItems[] | undefined
): number => {
    if (cartItems) {
        const matchingProduct = cartItems.find((products) => {
            return products.product.id === productId
        })
        if (matchingProduct) {
            return matchingProduct.quantity
        }
    }

    return 0
}
