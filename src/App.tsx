import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/carrito" element={<ShoppingCart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;