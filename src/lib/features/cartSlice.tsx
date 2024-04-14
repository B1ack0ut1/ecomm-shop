import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const cartAdapter = createEntityAdapter();

const initialState = cartAdapter.getInitialState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, id } = action.payload;
      const cartItem = state.entities[id];
      if (cartItem) {
        cartItem.amount++;
      } else {
        const newItem = { ...product, amount: 1 };
        cartAdapter.addOne(state, newItem);
      }
    },
    removeFromCart(state, action) {
      const { id } = action.payload;
      cartAdapter.removeOne(state, id);
    },
    clearCart(state, action) {
      cartAdapter.removeAll(state);
    },
    increaseAmount(state, action) {
      const { id } = action.payload;
      const cartItem = state.entities[id];
      cartItem.amount++;
    },
    decreaseAmount(state, action) {
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

export default cartSlice.reducer;
