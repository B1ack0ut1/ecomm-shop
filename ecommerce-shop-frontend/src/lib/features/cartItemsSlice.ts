import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from "../store";
// Type
import { ProductType } from "./productsSlice";

export type CartItemType = ProductType & { amount: number };

type ActionPayload = {
  id: number;
};

type AddToCartPayload = ActionPayload & { product: ProductType };

const cartAdapter = createEntityAdapter<CartItemType>();

const initialState = cartAdapter.getInitialState();

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart(state, action: { payload: AddToCartPayload }) {
      const { product, id } = action.payload;
      const cartItem = state.entities[id];
      if (cartItem) {
        cartItem.amount++;
      } else {
        const newItem = { ...product, amount: 1 };
        cartAdapter.addOne(state, newItem);
      }
    },
    removeFromCart(state, action: { payload: ActionPayload }) {
      const { id } = action.payload;
      cartAdapter.removeOne(state, id);
    },
    clearCart(state) {
      cartAdapter.removeAll(state);
    },
    increaseAmount(state, action: { payload: ActionPayload }) {
      const { id } = action.payload;
      const cartItem = state.entities[id];
      cartItem.amount++;
    },
    decreaseAmount(state, action: { payload: ActionPayload }) {
      const { id } = action.payload;
      const cartItem = state.entities[id];
      if (cartItem.amount < 2) {
        cartAdapter.removeOne(state, id);
      } else {
        cartItem.amount--;
      }
    },
  },
});

export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemsById,
  selectIds: selectCartItemsIds,
} = cartAdapter.getSelectors((state: RootState) => state.cartItems);

export const selectItemAmount = (state: RootState) => {
  const cartItems = selectAllCartItems(state);
  return cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.amount;
  }, 0);
};

export const selectTotal = (state: RootState) => {
  const cartItems = selectAllCartItems(state);
  return cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.amount * Number(cartItem.price);
  }, 0);
};

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseAmount,
  decreaseAmount,
} = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
