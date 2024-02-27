import { useProductPageStore } from './Store.ts'
import { Products } from './Components/Products.tsx'
import { Box, CssBaseline } from '@mui/material'
import SearchAppBar from './Components/SearchAppBar.tsx'
import ProductCategories from './Components/ProductCategories.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { ProductPageApiQueryKeys } from './api.ts'
import _ from 'lodash'
import useGetCart from './Hooks/useGetCart.ts'
import LinearProgression from './Components/LinearProgression.tsx'

function App() {
    const { cart, isLoading } = useGetCart()
    const setSearch = useProductPageStore((state) => state.setSearch)
    const queryClient = useQueryClient()
    const debouncedOnSearch = _.debounce((search: string) => {
        setSearch(search)
        queryClient.invalidateQueries({
            queryKey: [ProductPageApiQueryKeys.PRODUCTS, search],
        })
    }, 650)

    const onChangeSearch = (search: string) => {
        if (search.length >= 2 || !search.length) {
            debouncedOnSearch(search)
        }
    }

    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <CssBaseline />
            <SearchAppBar
                setSearch={onChangeSearch}
                totalItems={cart?.totalItems}
                totalPrice={cart?.totalPrice}
            />
            {isLoading ? <LinearProgression /> : null}
            <Box flex={1} display="flex" flexDirection="row">
                <ProductCategories />
                <Box flex={1}>
                    <Products />
                </Box>
            </Box>
        </Box>
    )
}

export default App
