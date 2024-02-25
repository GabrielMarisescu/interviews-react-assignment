import { Box, Grid, CircularProgress } from '@mui/material'
import { Product } from '../interfaces'
import InfiniteScroll from 'react-infinite-scroll-component'
import useGetInfiniteProducts from '../Hooks/useGetInfiniteProducts'
import ProductCard from './ProductCard'
import useFilterBySearchAndCategory from '../Hooks/useFilterBySearchAndCategory'

export const Products = () => {
    // const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

    const { products, hasNextPage, isLoading, fetchNextPage } =
        useGetInfiniteProducts()
    const { filteredProductsBySearch } = useFilterBySearchAndCategory(products)
    return (
        <Box overflow="scroll" height="100%">
            <InfiniteScroll
                dataLength={products.length}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={<CircularProgress size={20} />}
            >
                <Grid container spacing={2} p={2}>
                    {filteredProductsBySearch?.map((product: Product) => (
                        <ProductCard
                            isLoading={isLoading}
                            key={product.id}
                            {...product}
                        />
                    ))}
                </Grid>
            </InfiniteScroll>
        </Box>
    )
}
