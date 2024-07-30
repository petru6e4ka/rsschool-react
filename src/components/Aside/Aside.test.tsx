import {
  screen, fireEvent, act, waitFor,
} from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';
import Aside from './Aside';
import mocks from '../../utils/tests/mocks';
import renderWithWrappers from '../../utils/tests/renderWithWrappers';

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const route = '/pockemon/1';

describe('Aside', () => {
  it('Present on the page', async () => {
    await act(async () => {
      renderWithWrappers(<Aside />, { route });
    });

    expect(screen.getByTestId('aside')).toBeInTheDocument();
  });

  it('Renders loader', async () => {
    renderWithWrappers(<Aside />, { route });

    waitFor(() => expect(screen.getByTestId('loader')).toBeInTheDocument());
  });

  it('Correctly displays the detailed card data', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/1', () => HttpResponse.json(mocks.onePockemon)));

    await act(async () => {
      renderWithWrappers(<Aside />, { route });
    });

    waitFor(() => {
      expect(screen.getByText(new RegExp(`Name:\\+*${mocks.onePockemon.name}`, 'i'))).toBeInTheDocument();
    });
    waitFor(() => {
      expect(expect(screen.getByAltText(mocks.onePockemon.name)).toBeInTheDocument()).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.getByText(mocks.onePockemon.abilities[0].ability.name)).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.getByText(new RegExp(`Height:\\+*${mocks.onePockemon.height}`, 'i'))).toBeInTheDocument();
    });
    waitFor(() => {
      expect(screen.getByText(new RegExp(`Weight:\\+*${mocks.onePockemon.weight}`, 'i'))).toBeInTheDocument();
    });
  });

  it('Clicking the close button hides the component', async () => {
    await act(async () => {
      renderWithWrappers(<Aside />, { route });
    });

    const aside = screen.getByTestId('aside');
    const removeBtn = screen.getByTestId('close-detailed-card');

    expect(aside).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
    fireEvent.click(removeBtn);

    waitFor(() => expect(aside).not.toBeInTheDocument());
  });

  it('Shows error notification on rejected responce', async () => {
    server.use(http.get('https://pokeapi.co/api/v2/pokemon/1', () => HttpResponse.json('Not found', { status: 404 })));

    await act(async () => {
      renderWithWrappers(<Aside />, { route });
    });

    waitFor(() => expect(screen.getByText('Can&lsquo;t load the pockemon, please, try later')).toBeInTheDocument());
  });
});
