import { CategoriesEnum, FullProducts } from './interfaces'

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
    searchParam?: string
    pageParam: number
    categoryParam?: CategoriesEnum | ''
    limitParam?: number
}

/**
 *  @function
 * Fetching function which allow you to search for products.
 * @param page  number. Required.
 * @param category optional
 * @param limit number optional
 * @param search string optional
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
