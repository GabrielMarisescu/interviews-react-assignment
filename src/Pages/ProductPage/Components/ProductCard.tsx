import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { HeavyComponent } from '../../../Common/Hooks/HeavyComponent'
import { ProductCardProps } from '../interfaces'

function ProductCard(props: ProductCardProps) {
    const { price, isLoading, id, imageUrl, name, itemsInCart } = props
    return (
        <Grid item xs={4}>
            {/* Do not remove this */}
            <HeavyComponent />
            <Card key={id} style={{ width: '100%' }}>
                <CardMedia component="img" height="150" image={imageUrl} />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    </Typography>
                </CardContent>
                <CardActions>
                    <Typography variant="h6" component="div">
                        ${price}
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
                        ></Box>
                        <IconButton
                            disabled={isLoading}
                            aria-label="delete"
                            size="small"
                            // onClick={useAddToCart(
                            //     product.id,
                            //     -1
                            // )}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography variant="body1" component="div" mx={1}>
                            {itemsInCart}
                        </Typography>

                        <IconButton
                            disabled={isLoading}
                            aria-label="add"
                            size="small"
                            // onClick={() =>
                            //     addToCart(product.id, 1)
                            // }
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default ProductCard
