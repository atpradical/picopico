import { INCTAGRAM_BASE_URL } from "@/shared/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const inctagramApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: INCTAGRAM_BASE_URL,
  }),
  endpoints: () => ({}),
  reducerPath: "inctagramApi",
});
