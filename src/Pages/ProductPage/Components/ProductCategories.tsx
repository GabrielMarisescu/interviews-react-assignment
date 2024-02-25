import { Categories } from './Categories'
import { CategoriesEnum } from '../interfaces'
import { useProductPageStore } from '../Store'
import { useQueryClient } from '@tanstack/react-query'
import { ProductPageApiQueryKeys } from '../api'

// Get QueryClient from the context
const drawerWidth = 180

//In a real app, I would make an api call to get the real categories.
const categories: CategoriesEnum[] = [
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
    const changeCategory = useProductPageStore((state) => state.changeCategory)
    const queryClient = useQueryClient()
    const onChangeCategory = (category: CategoriesEnum) => {
        changeCategory(category)
        queryClient.invalidateQueries({
            queryKey: [ProductPageApiQueryKeys.PRODUCTS, category],
        })
    }

    return (
        <>
            <Categories
                categories={categories}
                drawerWidth={drawerWidth}
                onChangeCategory={onChangeCategory}
            />
        </>
    )
}

export default ProductCategories
