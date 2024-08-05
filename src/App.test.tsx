import { screen } from '@testing-library/react';
import renderWithWrappers from './utils/tests/renderWithWrappers';
import App from './App';

describe('App', () => {
  it('Present on the page', () => {
    renderWithWrappers(<App />, { route: '' });

    expect(screen.getByTestId('app')).toBeInTheDocument();
  });
});
