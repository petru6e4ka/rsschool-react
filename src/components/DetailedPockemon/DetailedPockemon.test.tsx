import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { Routes, Route } from 'react-router-dom';
import renderWithWrappers from '../../utils/tests/renderWithWrappers';
import DetailedPockemon from './DetailedPockemon';
import mocks from '../../utils/tests/mocks';
import Home from '../../pages/Home/Home';
import Aside from '../Aside/Aside';

const route = '/pockemon/1';
const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('DetailedPockemon', () => {
  it('Present on the page', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/*', () => HttpResponse.json(mocks.onePockemon, { status: 200 })));

    renderWithWrappers(<DetailedPockemon />, { route });

    expect(screen.getByTestId('pockemon-info')).toBeInTheDocument();
  });

  it('Renders loader', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/*', () => HttpResponse.json(mocks.onePockemon)));

    renderWithWrappers(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pockemon/:pockemon" element={<Aside />} />
      </Routes>,
      { route },
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('Correctly displays the detailed card data', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/*', () => HttpResponse.json(mocks.onePockemon)));

    renderWithWrappers(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pockemon/:pockemon" element={<Aside />} />
      </Routes>,
      { route },
    );

    await screen.findByText(new RegExp(`Name:\\+*${mocks.onePockemon.name}`, 'i'));
    expect(screen.getByText(mocks.onePockemon.abilities[0].ability.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Height:\\+*${mocks.onePockemon.height}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Weight:\\+*${mocks.onePockemon.weight}`, 'i'))).toBeInTheDocument();
  });

  it('Shows error notification on rejected responce', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/*', () => HttpResponse.json('Not found', { status: 404 })));

    renderWithWrappers(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pockemon/:pockemon" element={<Aside />} />
      </Routes>,
      { route: '/pockemon/1234567890' },
    );

    await screen.findByText('Can‘t load the pockemon, please, try later');
  });
});
