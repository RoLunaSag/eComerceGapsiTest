import { useState } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DroppableProvided,
    DraggableProvided,
    DropResult,
} from 'react-beautiful-dnd';
import {
    Typography,
    Box,
    CircularProgress,
    Button,
    Snackbar,
    Alert,
    Paper,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import SearchBar from '../components/SearchBar';
import ProductItem from '../components/ProductItem';
import { fetchProducts } from '../service/products';
import { ProductDetailsTypes } from '../utils/componentsTypes';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/shoppingCartSlice';
import { RootState } from '../store';

const Products = () => {
    const [items, setItems] = useState<ProductDetailsTypes[]>([]);
    const [loading, setLoading] = useState(false);
    const [lastKeyword, setLastKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const dispatch = useDispatch();
    const shoppingList = useSelector((state: RootState) => state.shoppingCart.items);

    const handleSearch = async (newKeyword: string, newPage: number) => {
        try {
            setLoading(true);
            setHasSearched(true);
            const isNewSearch = newKeyword !== keyword;
            const currentPage = isNewSearch ? 1 : newPage;

            setKeyword(newKeyword);
            setPage(currentPage);
            setLastKeyword(newKeyword);

            const data = await fetchProducts(newKeyword, currentPage);
            const stacks = data?.item?.props?.pageProps?.initialData?.searchResult?.itemStacks;

            const newItems: ProductDetailsTypes[] = Array.isArray(stacks)
                ? stacks.flatMap((stack: any) =>
                    (stack.items ?? []).filter(
                        (item: any) => item?.name && item?.image && item?.canonicalUrl
                    )
                )
                : [];

            if (isNewSearch) {
                setItems(newItems);
            } else {
                setItems((prev) => [...prev, ...newItems]);
            }
        } catch (err) {
            console.error('❌ Error al buscar productos:', err);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (product: ProductDetailsTypes) => {
        dispatch(addToCart(product));
        setShowSnackbar(true);
    };

    const handleDragEnd = (result: DropResult) => {
        const { destination, draggableId } = result;
        if (!destination) return;

        if (destination.droppableId === 'shoppingCart') {
            const draggedItem = items.find((item) => item.canonicalUrl === draggableId);
            if (draggedItem) {
                handleAddToCart(draggedItem);
            }
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Productos Walmart</Typography>
            <SearchBar onSearch={handleSearch} />
            {!loading && items.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                    {hasSearched
                        ? `No se encontraron productos para "${lastKeyword}".`
                        : 'Escribe un producto o derivado para poder buscar.'}
                </Typography>
            )}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Box display="flex" gap={4} flexDirection="row" alignItems="flex-start">
                    <Box flex={1}>
                        {loading ? (
                            <Box display="flex" justifyContent="center" my={4}>
                                <CircularProgress color="primary" />
                            </Box>
                        ) : (
                            <Droppable droppableId="products">
                                {(provided: DroppableProvided) => (
                                    <Box ref={provided.innerRef} {...provided.droppableProps}>
                                        {items.map((item, index) => (
                                            <Draggable
                                                key={item.canonicalUrl}
                                                draggableId={item.canonicalUrl}
                                                index={index}
                                            >
                                                {(provided: DraggableProvided) => (
                                                    <ProductItem
                                                        product={item}
                                                        provided={provided}
                                                        onAddToCart={handleAddToCart}
                                                    />
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </Box>
                                )}
                            </Droppable>
                        )}
                    </Box>
                    <Box flex={1}>
                        <Droppable droppableId="shoppingCart">
                            {(provided: DroppableProvided) => (
                                <Paper
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    sx={{ p: 2, minHeight: 300, backgroundColor: '#f9f9f9' }}
                                >
                                    <Typography variant="h6" align="center" mb={2}>
                                        🛒 Suelta aquí para agregar al carrito
                                    </Typography>
                                    <List>
                                        {shoppingList.map((item, index) => (
                                            <Draggable
                                                key={`cart-${item.canonicalUrl}`}
                                                draggableId={item.canonicalUrl}
                                                index={index}
                                            >
                                                {(provided: DraggableProvided) => (
                                                    <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <ListItemText
                                                            primary={item.name}
                                                            secondary={item.priceInfo?.linePriceDisplay || 'Precio no disponible'}
                                                        />
                                                    </ListItem>
                                                )}
                                            </Draggable>
                                        ))}
                                    </List>
                                    {provided.placeholder}
                                </Paper>
                            )}
                        </Droppable>
                    </Box>

                </Box>
            </DragDropContext>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={2000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setShowSnackbar(false)}>
                    Producto agregado al carrito
                </Alert>
            </Snackbar>
            {items.length > 0 && !loading && (
                <Box display="flex" justifyContent="center" my={4}>
                    <Button variant="outlined" onClick={() => handleSearch(keyword, page + 1)}>
                        Ver más
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Products;
