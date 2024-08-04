import { screen } from '@testing-library/react';
import Flyout from './Flyout';
import mocks from '../../utils/tests/mocks';
import renderWithWrappers from '../../utils/tests/renderWithWrappers';

const FAVOURITES_KEY = 'favourites';

afterEach(() => {
  window.localStorage.removeItem(FAVOURITES_KEY);
});

describe('Flyout', () => {
  it('Present on the page', () => {
    window.localStorage.setItem(FAVOURITES_KEY, JSON.stringify(mocks.favourites));
    renderWithWrappers(<Flyout />, { route: '' });

    expect(screen.getByTestId('flyout')).toBeInTheDocument();
  });
});
