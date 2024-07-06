const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

enum Methods {
  GET = 'GET',
}

const toFetch = async ({
  url = '',
  baseUrl = API_URL,
  headers = {},
  method = Methods.GET,
}: {
  url?: string;
  baseUrl?: string;
  headers?: Record<string, string>;
  method?: Methods;
}) => {
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

    return {
      isError: true,
      status: response.status,
    };
  } catch (error) {
    return {
      isError: true,
    };
  }
};

const getAllPockemons = () => toFetch({});
const getPockemon = (query: string) => toFetch({ url: query });

export { getAllPockemons, getPockemon };
