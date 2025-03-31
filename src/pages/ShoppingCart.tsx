import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, clearCart } from '../store/shoppingCartSlice';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ShoppingCart = () => {
    const items = useSelector((state: RootState) => state.shoppingCart.items);
    const dispatch = useDispatch();

    const handleRemove = (canonicalUrl: string) => {
        dispatch(removeFromCart(canonicalUrl));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <Box mt={4}>
            <Typography variant="h4" gutterBottom>
                Lista de Compras
            </Typography>

            {items.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    Tu carrito está vacío.
                </Typography>
            ) : (
                <>
                    <List>
                        {items.map((item, index) => (
                            <ListItem key={item.canonicalUrl ?? index} divider
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => handleRemove(item.canonicalUrl)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={item.name}
                                    secondary={item.priceInfo?.linePriceDisplay || 'Precio no disponible'}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button variant="outlined" color="secondary" onClick={handleClearCart}>
                            Vaciar carrito
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ShoppingCart;
