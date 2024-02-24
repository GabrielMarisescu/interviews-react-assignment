import { FullProducts } from './interfaces'

/**
 *  @enum
 *
 *  enum for the React Query keys for api calls. Used for Deduplication,Cacheing etc.
 *  @returns string of the single selected key.
 */
export enum ProductPageApiQueryKeys {
    PRODUCTS = 'PRODUCTS',
}

interface fetchProductsParams {
    pageParam: number
    limitParam: number
}

/**
 *  @function
 * Fetching function which allow you to search for products.
 * @param page  number. Required.
 * @param limit number.
 * @returns The paginated Products.
 */

export const fetchProducts = async ({
    pageParam,
    limitParam = 20,
}: fetchProductsParams): Promise<FullProducts> => {
    const rawProducts = await fetch(
        `products?page=${pageParam}&limit=${limitParam}`
    )
    const products = await rawProducts.json()
    return { ...products, pageParam }
}
//TODO : ADD Limit so you can choose how many items to see.
