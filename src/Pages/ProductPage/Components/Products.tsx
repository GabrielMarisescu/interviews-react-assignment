import { Box, Grid, CircularProgress } from '@mui/material'
import { Product } from '../interfaces'
import InfiniteScroll from 'react-infinite-scroll-component'
import useGetInfiniteProducts from '../Hooks/useGetInfiniteProducts'
import ProductCard from './ProductCard'

export const Products = () => {
    // const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

    const { products, hasNextPage, isLoading, fetchNextPage } =
        useGetInfiniteProducts()

    return (
        <Box overflow="scroll" height="100%">
            <InfiniteScroll
                dataLength={products.length}
                next={fetchNextPage}
                hasMore={hasNextPage}
                loader={<CircularProgress size={20} />}
            >
                <Grid container spacing={2} p={2}>
                    {products?.map((product: Product) => (
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
