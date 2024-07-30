import {
  act, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
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

    await act(async () => {
      renderWithWrappers(<Home />, { route: '' });
    });

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });

  it('Clicking on a link opens a detailed card component', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/*', () => HttpResponse.json(mocks.pockemonsList, { status: 200 })));

    await act(async () => {
      renderWithWrappers(
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pockemon/:pockemon" element={<Aside />} />
        </Routes>,
        { route: '/' },
      );
    });

    server.use(http.get('https://pokeapi.co/api/v2/pokemon/1', () => HttpResponse.json(mocks.onePockemon)));

    const openLink = screen.getAllByTestId('open-detailed_card');

    expect(screen.getByTestId('main')).not.toContainElement(screen.queryByTestId('aside'));
    fireEvent.click(openLink[0]);
    expect(await screen.findByTestId('aside')).toBeInTheDocument();
  });

  it('Updates URL query parameter when page changes', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/*', () => HttpResponse.json(mocks.pockemonsList, { status: 200 })));

    await act(async () => {
      renderWithWrappers(
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pockemon/:pockemon" element={<Aside />} />
        </Routes>,
        { route: '/' },
      );
    });

    const changePageLink = screen.getAllByTestId('pagination-btn');

    fireEvent.click(changePageLink[2]);

    waitFor(() => {
      expect(global.window.location.toString()).toContain('?page=3');
    });
  });

  it('Shows error notification on rejected responce', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/*', () => HttpResponse.json('Server error', { status: 500 })));

    await act(async () => {
      renderWithWrappers(<Home />, { route: '' });
    });

    waitFor(() => {
      expect(screen.getByTestId('error-notification')).toBeInTheDocument();
    });
  });

  it('Triggers an additional API call to fetch detailed information', async () => {
    let calls = 0;

    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/*', () => {
        calls += 1;
        return HttpResponse.json(mocks.pockemonsList, { status: 200 });
      }),
    );

    await act(async () => {
      renderWithWrappers(
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pockemon/:pockemon" element={<Aside />} />
        </Routes>,
        { route: '/' },
      );
    });

    server.use(
      http.get('https://pokeapi.co/api/v2/pokemon/1', () => {
        calls += 1;
        return HttpResponse.json(mocks.onePockemon);
      }),
    );

    const openLink = screen.getAllByTestId('open-detailed_card');

    fireEvent.click(openLink[1]);

    waitFor(() => {
      expect(calls).toHaveValue(2);
    });
  });
});
