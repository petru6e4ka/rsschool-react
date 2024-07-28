import { screen } from '@testing-library/react';
import Pagination from './Pagination';
import renderWithWrappers from '../../utils/tests/renderWithWrappers';

describe('Pagination', () => {
  it('Present on the page', () => {
    renderWithWrappers(<Pagination />, { route: '' });

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
