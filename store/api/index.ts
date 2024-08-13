import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pockemon } from '../../types/Pockemon';

export type DefaultParams = { skip?: number; limit?: number };

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
export const DEFAULT_SKIP = 0;
export const DEFAULT_LIMIT = 21;
export const TOTAL = 1302;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getPockemonsByPage: builder.query<{ results: Pockemon[] }, DefaultParams>({
      query: (params: DefaultParams = {}) => `?offset=${params.skip || DEFAULT_SKIP}&limit=${params.limit || DEFAULT_LIMIT}`,
    }),
    getPockemon: builder.query<Pockemon, string>({
      query: (query: string) => query,
    }),
    getAllPockemons: builder.query<{ results: Pockemon[] }, void>({
      query: () => `?offset=0&limit=${TOTAL}`,
    }),
  }),
});

export const {
  useGetPockemonsByPageQuery,
  useLazyGetPockemonQuery,
  useLazyGetPockemonsByPageQuery,
  useGetPockemonQuery,
  useGetAllPockemonsQuery,
  useLazyGetAllPockemonsQuery,
} = pokemonApi;
