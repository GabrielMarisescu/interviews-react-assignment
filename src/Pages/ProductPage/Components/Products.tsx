import { Box, Grid, CircularProgress } from '@mui/material'
import { Product } from '../interfaces'
import InfiniteScroll from 'react-infinite-scroll-component'
import useGetInfiniteProducts from '../Hooks/useGetInfiniteProducts'
import ProductCard from './ProductCard'
import { useProductPageStore } from '../Store'
import useAddToCart from '../Hooks/useAddToCart'
import useGetCart from '../Hooks/useGetCart'
import { calculateItemsInCart } from '../Utils/calculateItemsInCart'

export const Products = () => {
    const search = useProductPageStore((store) => store.search)
    const category = useProductPageStore((store) => store.category)
    const { products, hasNextPage, isLoading, fetchNextPage } =
        useGetInfiniteProducts(category, search)
    const { cart } = useGetCart()

    const { addToCart } = useAddToCart()

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
                            {...product}
                            addToCart={addToCart}
                            isLoading={isLoading}
                            key={product.id}
                            itemsInCart={() =>
                                calculateItemsInCart(product.id, cart?.items)
                            }
                        />
                    ))}
                </Grid>
            </InfiniteScroll>
        </Box>
    )
}
