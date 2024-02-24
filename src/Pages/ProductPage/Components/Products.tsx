import { useEffect, useState } from 'react'
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
    CircularProgress,
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { HeavyComponent } from '../../../Common/Hooks/HeavyComponent'
import { Cart, Product } from '../interfaces'

export const Products = ({
    onCartChange,
}: {
    onCartChange: (cart: Cart) => void
}) => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetch('/products?limit=20')
            .then((response) => response.json())
            .then((data) => setProducts(data.products))
    }, [])

    function addToCart(productId: number, quantity: number) {
        setProducts(
            products.map((product) => {
                if (product.id === productId) {
                    return {
                        ...product,
                        loading: true,
                    }
                }
                return product
            })
        )
        fetch('/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity }),
        }).then(async (response) => {
            if (response.ok) {
                const cart = await response.json()
                setProducts(
                    products.map((product) => {
                        if (product.id === productId) {
                            return {
                                ...product,
                                itemInCart:
                                    (product.itemInCart || 0) + quantity,
                                loading: false,
                            }
                        }
                        return product
                    })
                )
                onCartChange(cart)
            }
        })
    }

    return (
        <Box overflow="scroll" height="100%">
            <Grid container spacing={2} p={2}>
                {products.map((product) => (
                    <Grid item xs={4}>
                        {/* Do not remove this */}
                        <HeavyComponent />
                        <Card key={product.id} style={{ width: '100%' }}>
                            <CardMedia
                                component="img"
                                height="150"
                                image={product.imageUrl}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                >
                                    {product.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit,
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Typography variant="h6" component="div">
                                    ${product.price}
                                </Typography>
                                <Box flexGrow={1} />
                                <Box
                                    position="relative"
                                    display="flex"
                                    flexDirection="row"
                                    alignItems="center"
                                >
                                    <Box
                                        position="absolute"
                                        left={0}
                                        right={0}
                                        top={0}
                                        bottom={0}
                                        textAlign="center"
                                    >
                                        {product.loading && (
                                            <CircularProgress size={20} />
                                        )}
                                    </Box>
                                    <IconButton
                                        disabled={product.loading}
                                        aria-label="delete"
                                        size="small"
                                        onClick={() =>
                                            addToCart(product.id, -1)
                                        }
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </IconButton>

                                    <Typography
                                        variant="body1"
                                        component="div"
                                        mx={1}
                                    >
                                        {product.itemInCart || 0}
                                    </Typography>

                                    <IconButton
                                        disabled={product.loading}
                                        aria-label="add"
                                        size="small"
                                        onClick={() => addToCart(product.id, 1)}
                                    >
                                        <AddIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
