import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { vi } from 'vitest';
import Home from './Home';
import { SEARCH_KEY } from '../../components/Search/Search';
import Aside from '../../components/Aside/Aside';
import renderWithWrappers from '../../utils/tests/renderWithWrappers';
import mocks from '../../utils/tests/mocks';

beforeEach(() => {
  localStorage.setItem(SEARCH_KEY, '');
});

afterEach(() => {
  localStorage.removeItem(SEARCH_KEY);
});

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Home', () => {
  it('Main is present on the page', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/*', () => HttpResponse.json(mocks.pockemonsList, { status: 200 })));

    renderWithWrappers(<Home />, { route: '' });

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });

  it('Clicking on a link opens a detailed card component', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/*', () => HttpResponse.json(mocks.pockemonsList, { status: 200 })));

    renderWithWrappers(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pockemon/:pockemon" element={<Aside />} />
      </Routes>,
      { route: '/' },
    );

    server.use(http.get('https://pokeapi.co/api/v2/pokemon/1', () => HttpResponse.json(mocks.onePockemon)));

    const openLink = await screen.findAllByTestId('open-detailed_card');

    expect(screen.getByTestId('main')).not.toContainElement(screen.queryByTestId('aside'));
    fireEvent.click(openLink[0]);

    expect(screen.getByTestId('aside')).toBeInTheDocument();
  });

  it('Shows error notification on rejected responce', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/*', () => HttpResponse.json('Not found', { status: 404 })));

    renderWithWrappers(
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>,
      { route: '?page=1234567890' },
    );

    const error = await screen.findByTestId('error-notification');

    expect(error).toBeInTheDocument();
  });

  it('Triggers an additional API call to fetch detailed information', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/*', () => HttpResponse.json(mocks.pockemonsList, { status: 200 })));

    renderWithWrappers(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pockemon/:pockemon" element={<Aside />} />
      </Routes>,
      { route: '/' },
    );

    const mockCall = vi.fn();

    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/*', () => {
        mockCall();
        return HttpResponse.json(mocks.onePockemon, { status: 200 });
      }),
    );

    const openLink = screen.getAllByTestId('open-detailed_card');

    fireEvent.click(openLink[1]);

    await waitFor(() => expect(mockCall).toHaveBeenCalled());
  });
});
