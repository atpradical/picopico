import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const picoApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_PICO_BASE_URL,
  }),
  endpoints: () => ({}),
  reducerPath: "picoApi",
});
