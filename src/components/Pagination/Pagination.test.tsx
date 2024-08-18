import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Pagination from './Pagination';
import renderWithWrappers from '../../utils/tests/renderWithWrappers';

const mockGetSearchParams = { get: () => {}, entries: () => [] };
const mockSetSearchParams = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [mockGetSearchParams, mockSetSearchParams],
  };
});

afterAll(() => {
  vi.clearAllMocks();
});

describe('Pagination', () => {
  it('Present on the page', () => {
    renderWithWrappers(<Pagination />, { route: '' });

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('Updates URL query parameter when page changes', async () => {
    renderWithWrappers(<Pagination />, { route: '' });

    const changePageLink = screen.getAllByTestId('pagination-btn');
    expect(mockSetSearchParams).not.toHaveBeenCalled();

    fireEvent.click(changePageLink[2]);

    expect(mockSetSearchParams).toHaveBeenCalled();
  });
});
