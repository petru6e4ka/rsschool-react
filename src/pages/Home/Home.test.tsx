import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import renderWithRouter from '../../utils/tests/renderWithRouter';
import { SEARCH_KEY } from '../../components/Search/Search';
import Aside from '../../components/Aside/Aside';
import mock from '../../utils/tests/mocks';

beforeEach(() => {
  localStorage.setItem(SEARCH_KEY, '');

  const okResponse = new Response(JSON.stringify(mock.pockemonsList), {
    status: 200,
    statusText: 'OK',
  });

  const okResponse2 = new Response(JSON.stringify(mock.onePockemon), {
    status: 200,
    statusText: 'OK',
  });

  global.fetch = vi
    .fn()
    .mockResolvedValueOnce(okResponse)
    .mockResolvedValueOnce(okResponse.clone())
    .mockResolvedValueOnce(okResponse2)
    .mockResolvedValueOnce(okResponse.clone());

  vi.spyOn(global.window.location, 'assign');
});

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
  localStorage.removeItem(SEARCH_KEY);
});

describe('Home', () => {
  it('Main is present on the page', async () => {
    await act(async () => {
      renderWithRouter(<Home />);
    });

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });

  it('Clicking on a link opens a detailed card component', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="pockemon/:pockemon" element={<Aside />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    const openLink = screen.getAllByTestId('open-detailed_card');

    expect(screen.getByTestId('main')).not.toContainElement(
      screen.queryByTestId('aside'),
    );

    fireEvent.click(openLink[0]);

    expect(await screen.findByTestId('aside')).toBeInTheDocument();
  });

  it('Triggers an additional API call to fetch detailed information', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="pockemon/:pockemon" element={<Aside />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    const openLink = screen.getAllByTestId('open-detailed_card');

    expect(global.fetch).toHaveBeenCalledTimes(2);

    fireEvent.click(openLink[1]);

    expect(await screen.findByTestId('aside')).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it('Updates URL query parameter when page changes', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="pockemon/:pockemon" element={<Aside />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    const changePageLink = screen.getAllByTestId('pagination-btn');

    fireEvent.click(changePageLink[2]);

    waitFor(() => {
      expect(global.window.location.toString()).toContain('?page=3');
    });
  });
});
