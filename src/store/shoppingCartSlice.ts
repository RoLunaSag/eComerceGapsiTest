import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDetailsTypes } from '../utils/componentsTypes';

interface ShoppingCartState {
  items: ProductDetailsTypes[];
}

const initialState: ShoppingCartState = {
  items: [],
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductDetailsTypes>) => {
      const exists = state.items.some(
        (item) => item.canonicalUrl === action.payload.canonicalUrl
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.canonicalUrl !== action.payload
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
