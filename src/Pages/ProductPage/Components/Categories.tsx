import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const drawerWidth = 180;

const categories = ['Fruit', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Seafood', 'Snacks', 'Beverages'];

export const Categories = () => {
  return (
    <Box minWidth={drawerWidth} sx={{ borderRight: '1px solid grey' }}>
      <List>
        {categories.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
