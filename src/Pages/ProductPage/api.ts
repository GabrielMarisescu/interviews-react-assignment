import { Cart, CategoriesEnum, FullProducts } from './interfaces'

/**
 *  @enum
 *
 *  enum for the React Query keys for api calls. Used for Deduplication,Cacheing etc.
 *  @returns string of the single selected key.
 */
export enum ProductPageApiQueryKeys {
    CART = 'CART',
    PRODUCTS = 'PRODUCTS',
}

interface fetchProductsParams {
    searchParam?: string
    pageParam: number
    categoryParam?: CategoriesEnum | ''
    limitParam?: number
}
interface postToCartParams {
    quantity: number
    productId: number
}

/**
 * @param page  number. Required.
 * @param category Optional
 * @param limit number Optional
 * @param search string Optional
 * @returns A list of Products filtered by your params.
 */

export const fetchProducts = async ({
    pageParam,
    categoryParam,
    searchParam,
    limitParam = 20,
}: fetchProductsParams): Promise<FullProducts> => {
    const rawProducts = await fetch(
        `products?page=${pageParam}&limit=${limitParam}&category=${categoryParam}&q=${searchParam}`
    )
    const products = await rawProducts.json()
    return { ...products, pageParam }
}

//TODO : ADD Limit so you can choose how many items to see.

/**
 * @param productId, Required
 * @param quantity, Required
 * @returns an array of products
 */
export const postToCart = async ({
    productId,
    quantity,
}: postToCartParams): Promise<Cart> => {
    const rawCart = await fetch(`/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
    })
    const Cart = await rawCart.json()
    return Cart
}

export const getCart = async (): Promise<Cart> => {
    const rawCart = await fetch(`/cart`)
    const Cart = await rawCart.json()
    return { ...Cart, loading: false }
}
