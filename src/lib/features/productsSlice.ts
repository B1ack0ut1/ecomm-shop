import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { RootState } from "../store";

export type ProductType = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: string;
};

type ProductsResponse = ProductType[];

type ProductsAdapter = ReturnType<typeof productsAdapter.getInitialState>;

const productsAdapter = createEntityAdapter<ProductType>();

const initialState = productsAdapter.getInitialState();

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsAdapter, void>({
      query: () => "/products",
      transformResponse: (responseData: ProductsResponse) => {
        // get only men's & women's clothing category
        const filteredProducts = responseData.filter((item) => {
          return (
            item.category === "men's clothing" ||
            item.category === "women's clothing"
          );
        });
        return productsAdapter.setAll(initialState, filteredProducts);
      },
      providesTags: (result) => {
        if (result) {
          return [
            { type: "Product", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Product" as const, id })),
          ];
        } else {
          return [{ type: "Product", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApiSlice;

export const { selectAll: selectAllProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state: RootState) => state.cartItems);

export default productsApiSlice.reducer;
