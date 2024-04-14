import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState();

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      transformResponse: (responseData) => {
        // get only men's & women's clothing category
        const filteredProducts = responseData.filter((item) => {
          return (
            item.category === "men's clothing" ||
            item.category === "women's clothing"
          );
        });
        return productsAdapter.setAll(initialState, filteredProducts);
      },
      providesTags: (result, error, arg) => [
        { type: "Product", id: "LIST" },
        ...result.ids.map((id) => ({ type: "User", id })),
      ],
    }),
  }),
});

export const { useGetProductsQuery } = productsApiSlice;

export default productsApiSlice.reducer;
