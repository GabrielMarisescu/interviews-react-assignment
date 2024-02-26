import { Box, Grid, CircularProgress } from '@mui/material'
import { Product } from '../interfaces'
import InfiniteScroll from 'react-infinite-scroll-component'
import useGetInfiniteProducts from '../Hooks/useGetInfiniteProducts'
import ProductCard from './ProductCard'
import { useProductPageStore } from '../Store'
import { useEffect } from 'react'
import _ from 'lodash'

export const Products = () => {
    // const addItemsToCart = useProductPageStore((store) => store.addItemToCart)

    const products = useProductPageStore((store) => store.products)
    const search = useProductPageStore((store) => store.search)
    const category = useProductPageStore((store) => store.category)
    const setProducts = useProductPageStore((store) => store.setProducts)
    const { cachedProducts, hasNextPage, isLoading, fetchNextPage } =
        useGetInfiniteProducts(category, search)

    useEffect(() => {
        if (cachedProducts && !_.isEqual(cachedProducts, products)) {
            setProducts(cachedProducts)
        }
    }, [cachedProducts, setProducts, products])

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
                            product={product}
                            // addItemsToCart={addItemsToCart}
                            isLoading={isLoading}
                            key={product.id}
                        />
                    ))}
                </Grid>
            </InfiniteScroll>
        </Box>
    )
}
