import { cleanup, fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../utils/tests/renderWithRouter';
import Search, { SEARCH_KEY } from './Search';

afterEach(() => {
  window.localStorage.removeItem(SEARCH_KEY);
  cleanup();
});

describe('Search', () => {
  it('Present on the page', () => {
    renderWithRouter(<Search />);

    expect(screen.getByTestId('search')).toBeInTheDocument();
  });

  it('Clicking the Search button saves the entered value to the local storage', () => {
    renderWithRouter(<Search />);

    const value = 'bulbasaur';
    const input = screen.getByTestId('search-input');
    const saveBtn = screen.getByTestId('search-btn');

    fireEvent.change(input, {
      target: { value },
    });

    fireEvent.click(saveBtn);

    const savedValue = window.localStorage.getItem(SEARCH_KEY);

    expect(savedValue).toEqual(JSON.stringify(value));
  });

  it('Retrieves the value from the local storage upon mounting', () => {
    const value = 'metapod';

    window.localStorage.setItem(SEARCH_KEY, value);

    renderWithRouter(<Search />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;

    expect(input.value).toEqual(value);
  });
});
