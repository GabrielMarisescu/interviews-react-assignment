import { useProductPageStore } from './Store.ts'
import { Products } from './Components/Products.tsx'
import { Box, CssBaseline } from '@mui/material'
import SearchAppBar from './Components/SearchAppBar.tsx'
import { Categories } from './Components/Categories.tsx'
import { useState } from 'react'
import { Cart } from './interfaces.ts'

function App() {
    //refactor this to go to the store so both components can access it
    // const bears = useProductPageStore((state) => state.bears)
    const [cart, setCart] = useState<Cart>()

    const changeSearch = useProductPageStore((state) => state.changeSearch)
    return (
        <Box height="100vh" display="flex" flexDirection="column">
            <CssBaseline />
            <SearchAppBar
                changeSearch={changeSearch}
                quantity={cart?.totalItems || 0}
                price={cart?.totalPrice || 0}
            />
            <Box flex={1} display="flex" flexDirection="row">
                <Categories />
                <Box flex={1}>
                    <Products />
                </Box>
            </Box>
        </Box>
    )
}

export default App
