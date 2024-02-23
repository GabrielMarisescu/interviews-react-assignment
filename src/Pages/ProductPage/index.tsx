import { Cart, Products } from './Components/Products.tsx'
import { Box, CssBaseline } from '@mui/material'
import SearchAppBar from './Components/SearchAppBar.tsx'
import { Categories } from './Components/Categories.tsx'
import { useState } from 'react'

function App() {
    const [cart, setCart] = useState<Cart>()

    function onCartChange(cart: Cart) {
        setCart(cart)
    }
    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <CssBaseline />
            <SearchAppBar
                quantity={cart?.totalItems || 0}
                price={cart?.totalPrice || 0}
            />
            <Box flex={1} display="flex" flexDirection="row">
                <Categories />
                <Box flex={1}>
                    <Products onCartChange={onCartChange} />
                </Box>
            </Box>
        </Box>
    )
}

export default App
