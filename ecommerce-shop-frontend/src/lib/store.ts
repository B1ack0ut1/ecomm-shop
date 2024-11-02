import { configureStore, Middleware } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import cartItemsReducer from "./features/cartItemsSlice";
import sidebarReducer from "./features/sidebarSlice";

function isActionWithType(action: unknown): action is { type: string } {
  return (
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    typeof action.type === "string"
  );
}

const cartLocalStorageMiddleware: Middleware<unknown, RootState> =
  (store) => (next) => (action: unknown) => {
    console.log("Running cartLocalStorageMiddleware");
    console.log(action);
    if (!isActionWithType(action) || !action.type.startsWith("cartItems/")) {
      return next(action);
    }
    console.log(
      "Passed conditions, updating state and syncing with local storage"
    );
    const result = next(action);

    const state = store.getState();
    const cartItems = state.cartItems.ids.map(
      (id) => state.cartItems.entities[id]
    );
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    return result;
  };

export const store = configureStore({
  reducer: {
    cartItems: cartItemsReducer,
    sidebar: sidebarReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      cartLocalStorageMiddleware
    ),
});

export type RootState = {
  cartItems: ReturnType<typeof cartItemsReducer>;
  sidebar: ReturnType<typeof sidebarReducer>;
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
};
export type AppDispatch = typeof store.dispatch;

export default store;
