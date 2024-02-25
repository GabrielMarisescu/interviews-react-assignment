import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material'
import { CategoriesProps } from '../interfaces'
/**
 * @function
 * @param categories , CategoryEnum[]
 * @param drawerWidth, number
 * @returns The list of all the categories provided according to the drawerWidth
 */
export const Categories = ({
    categories,
    drawerWidth,
    onChangeCategory,
}: CategoriesProps) => {
    return (
        <Box minWidth={drawerWidth} sx={{ borderRight: '1px solid grey' }}>
            <List>
                {categories.map((category) => (
                    <ListItem key={category} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                onChangeCategory(category)
                            }}
                        >
                            <ListItemText primary={category} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
