import { Pockemon } from '../../types/Pockemon';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const ERROR_MESSAGE = 'Request failed';

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

    throw new Error(ERROR_MESSAGE);
  } catch (error) {
    throw new Error(ERROR_MESSAGE);
  }
};

const getAllPockemons = () => toFetch<{ results: Pockemon[] }>({});
const getPockemon = (query: string) => toFetch<Pockemon>({ url: query });

export { getAllPockemons, getPockemon };
