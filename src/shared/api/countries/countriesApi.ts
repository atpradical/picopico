import {
  GetCitiesArgs,
  GetCountriesArgs,
  ResponseGetCountries,
} from '@/shared/api/countries/countries.types'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

export const countriesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_COUNTRIES_BASE_URL }),
  endpoints: builder => {
    return {
      getCities: builder.query<void, GetCitiesArgs>({
        query: ({ countryName, locale, minPopulation }) =>
          `searchJSON?country=${countryName}&lang=${locale}&featureClass=P&minPopulation=${minPopulation}&username=${process.env.NEXT_PUBLIC_COUNTRIES_USERNAME}`,
        transformResponse: response =>
          //@ts-ignore //todo: Задать вопрос по типизации transformResponse
          response.geonames.map(city => ({
            option: city.name,
            value: city.geonameId.toString(), // City ID in geonames
          })),
      }),
      getCountries: builder.query<ResponseGetCountries, GetCountriesArgs>({
        query: ({ locale }) =>
          `countryInfoJSON?lang=${locale}&username=${process.env.NEXT_PUBLIC_COUNTRIES_USERNAME}`,
        transformResponse: response =>
          //@ts-ignore //todo: Задать вопрос по типизации transformResponse
          response.geonames.map(country => ({
            option: country.countryName,
            value: country.countryCode,
          })),
      }),
    }
  },
  reducerPath: 'countriesApi',
  tagTypes: [],
})

export const { useGetCountriesQuery, useLazyGetCitiesQuery } = countriesApi
