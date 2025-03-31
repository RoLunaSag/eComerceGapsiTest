import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Link as LinkDOM } from 'react-router-dom';

const Navbar = () => {
  const cartCount = useSelector((state: RootState) => state.shoppingCart.items.length);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <img src="/logoBlanco.png" alt="e-Commerce Gapsi" style={{ height: 40, marginRight: 16 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          e-Commerce Gapsi
        </Typography>
        <Box>
          <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ mx: 1 }}>
            <Button color="inherit">Inicio</Button>
          </Link>
          <Link component={RouterLink} to="/products" color="inherit" underline="none" sx={{ mx: 1 }}>
            <Button color="inherit">Productos</Button>
          </Link>
          <Button component={LinkDOM} to="/carrito" color="inherit">
            🛒 Carrito ({cartCount})
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
