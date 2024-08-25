import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import "whatwg-fetch";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
    fetchFn: window.fetch,
  }),
  tagTypes: ["Product"],
  endpoints: () => ({}),
});
