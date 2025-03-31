import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { CartProps } from '../utils/componentsTypes';


const ShoppingCart: React.FC<CartProps> = ({ items }) => {
  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Lista de Compras
      </Typography>

      {items.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Tu carrito está vacío.
        </Typography>
      ) : (
        <List>
          {items.map((item, index) => (
            <ListItem key={item.canonicalUrl ?? index} divider>
              <ListItemText
                primary={item.name}
                secondary={item.priceInfo?.linePriceDisplay || 'Precio no disponible'}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ShoppingCart;
