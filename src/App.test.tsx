import { screen } from '@testing-library/react';
import renderWithRouter from './utils/tests/renderWithRouter';
import App from './App';

describe('App', () => {
  it('Present on the page', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId('app')).toBeInTheDocument();
  });
});
