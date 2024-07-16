import {
  screen,
  render,
  waitForElementToBeRemoved,
  fireEvent,
  cleanup,
  act,
} from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Aside from './Aside';
import mocks from '../../utils/tests/mocks';

const route = '/pockemon/1';

beforeEach(() => {
  const okResponse = new Response(JSON.stringify(mocks.onePockemon), {
    status: 200,
    statusText: 'OK',
  });

  global.fetch = vi.fn().mockResolvedValue(okResponse);
});

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

describe('Aside', () => {
  it('Present on the page', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="pockemon/:pockemon" element={<Aside />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    expect(screen.getByTestId('aside')).toBeInTheDocument();
  });

  it('A loading indicator is displayed while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="pockemon/:pockemon" element={<Aside />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getAllByTestId('loader'));

    expect(screen.getByTestId('pockemon-info')).toBeInTheDocument();
  });

  it('Correctly displays the detailed card data', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="pockemon/:pockemon" element={<Aside />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    expect(
      screen.getByText(new RegExp(`Name:\\+*${mocks.onePockemon.name}`, 'i')),
    ).toBeInTheDocument();
    expect(screen.getByAltText(mocks.onePockemon.name)).toBeInTheDocument();
    expect(
      screen.getByText(mocks.onePockemon.abilities[0].ability.name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mocks.onePockemon.abilities[1].ability.name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`Height:\\+*${mocks.onePockemon.height}`, 'i'),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`Weight:\\+*${mocks.onePockemon.weight}`, 'i'),
      ),
    ).toBeInTheDocument();
  });

  it('Clicking the close button hides the component', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/" element={<div data-testid="home" />} />
            <Route path="pockemon/:pockemon" element={<Aside />} />
          </Routes>
        </MemoryRouter>,
      );
    });

    const aside = screen.getByTestId('aside');
    const removeBtn = screen.getByTestId('close-detailed-card');

    expect(aside).toBeInTheDocument();

    fireEvent.click(removeBtn);

    expect(aside).not.toBeInTheDocument();
  });
});
