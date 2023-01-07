import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5001" }),
  reducerPath: "adminApi",

  tagTypes: ["User", "Products", "Customers"],

  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,

      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => `client/products`,

      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => `client/customers`,

      providesTags: ["Customers"],
    }),
  }),
});

// useGetUserQuery comes from above name of getUser which has use at beginning and query at end

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery } =
  api;
