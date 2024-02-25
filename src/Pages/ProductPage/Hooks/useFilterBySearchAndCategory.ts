import { useProductPageStore } from '../Store'
import { Product } from '../interfaces'
/**
 * @function
 * @param Products - An Array of Products
 * @returns a list of all the products that are filtered by Search
 */

function useFilterBySearchAndCategory(products: Product[]) {
    const search = useProductPageStore((state) => state.search)
    // const category = useProductPageStore((state) => state.category)
    let filteredProductsBySearch: Product[]

    if (search) {
        filteredProductsBySearch = products.filter((product: Product) =>
            product.name.toUpperCase().startsWith(search.trim().toUpperCase())
        )
    } else {
        filteredProductsBySearch = products
    }
    return { filteredProductsBySearch }
}

export default useFilterBySearchAndCategory
