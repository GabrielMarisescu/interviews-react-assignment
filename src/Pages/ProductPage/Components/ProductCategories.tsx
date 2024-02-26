import { Categories } from './Categories'
import _ from 'lodash'
import { CategoriesEnum } from '../interfaces'
import { useProductPageStore } from '../Store'
import { useQueryClient } from '@tanstack/react-query'
import { ProductPageApiQueryKeys } from '../api'

// Get QueryClient from the context
const drawerWidth = 180

//In a real app, I would make an api call to get the real categories.

const categories: CategoriesEnum[] = [
    CategoriesEnum.All,
    CategoriesEnum.Snacks,
    CategoriesEnum.Beverages,
    CategoriesEnum.Seafood,
    CategoriesEnum.Bakery,
    CategoriesEnum.Fruit,
    CategoriesEnum.Vegetables,
    CategoriesEnum.Meat,
    CategoriesEnum.Dairy,
]

function ProductCategories() {
    const setCategory = useProductPageStore((state) => state.setCategory)
    const queryClient = useQueryClient()

    const debouncedOnChangeCategory = _.debounce((category: CategoriesEnum) => {
        setCategory(category)
        queryClient.invalidateQueries({
            queryKey: [ProductPageApiQueryKeys.PRODUCTS, category],
        })
    }, 650)

    return (
        <>
            <Categories
                categories={categories}
                drawerWidth={drawerWidth}
                onChangeCategory={debouncedOnChangeCategory}
            />
        </>
    )
}

export default ProductCategories
