import { Card, CardContent, Typography, CardMedia, Box, Button } from '@mui/material';
import { ProductItemTypes } from '../utils/componentsTypes';

const ProductItem: React.FC<ProductItemTypes> = ({ product, provided, onAddToCart }) => {
  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      sx={{ display: 'flex', mb: 2 }}
    >
      {product.image && (
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ width: 150 }}
        />
      )}
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>

        {product.priceInfo?.linePriceDisplay && (
          <Typography variant="body2" color="text.secondary">
            Precio: {product.priceInfo.linePriceDisplay}
          </Typography>
        )}

        {product.averageRating !== undefined && (
          <Typography variant="body2">
            Rating: {product.averageRating} ⭐
          </Typography>
        )}

        {product.numberOfReviews !== undefined && (
          <Typography variant="body2">
            Reseñas: {product.numberOfReviews}
          </Typography>
        )}
        <Button
          size="small"
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => onAddToCart(product)}
        >
          Agregar al carrito
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductItem;
