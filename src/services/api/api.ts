import { Pockemon } from '../../types/Pockemon';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const ERROR_MESSAGE = 'Request failed';

export const DEFAULT_SKIP = 0;
export const DEFAULT_LIMIT = 21;
export const TOTAL = 1302;

enum Methods {
  GET = 'GET',
}

const toFetch = async <T>({
  url = '',
  baseUrl = API_URL,
  headers = {},
  method = Methods.GET,
}: {
  url?: string;
  baseUrl?: string;
  headers?: Record<string, string>;
  method?: Methods;
}): Promise<T> => {
  try {
    const response = await fetch(baseUrl + url, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      method,
    });

    if (response.ok) {
      const data = await response.json();

      return data;
    }

    const message = response.status ? `${ERROR_MESSAGE}: ${response.status}` : '';

    throw new Error(message);
  } catch (error) {
    const err = error as unknown as { message: string };

    if (err.message.includes(ERROR_MESSAGE)) {
      throw new Error(err.message);
    }

    throw new Error(ERROR_MESSAGE);
  }
};

export type DefaultParams = { skip?: number; limit?: number };

const getAllPockemons = (params: DefaultParams = {}) => toFetch<{ results: Pockemon[] }>({
  url: `?offset=${params.skip || DEFAULT_SKIP}&limit=${params.limit || DEFAULT_LIMIT}`,
});
const getPockemon = (query: string) => toFetch<Pockemon>({ url: query });

export const service = { getAllPockemons, getPockemon };
export default { getAllPockemons, getPockemon };
export type Service = typeof service;
