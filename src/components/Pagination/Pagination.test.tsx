import { screen } from '@testing-library/react';
import renderWithRouter from '../../utils/tests/renderWithRouter';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('Present on the page', () => {
    renderWithRouter(<Pagination />);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
