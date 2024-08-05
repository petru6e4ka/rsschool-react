import { screen, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { Routes, Route } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import Aside from './Aside';
import renderWithWrappers from '../../utils/tests/renderWithWrappers';
import Home from '../../pages/Home/Home';
import mocks from '../../utils/tests/mocks';

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const route = '/pockemon/1';

describe('Aside', () => {
  it('Present on the page', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/*', () => HttpResponse.json(mocks.onePockemon)));

    renderWithWrappers(<Aside />, { route });

    expect(screen.getByTestId('aside')).toBeInTheDocument();
  });

  it('Clicking the close button hides the component', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/*', () => HttpResponse.json(mocks.onePockemon)));

    renderWithWrappers(
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pockemon/:pockemon" element={<Aside />} />
      </Routes>,
      { route },
    );

    const aside = screen.getByTestId('aside');
    const removeBtn = screen.getByTestId('close-detailed-card');

    expect(aside).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
    fireEvent.click(removeBtn);

    expect(aside).not.toBeInTheDocument();
  });
});
