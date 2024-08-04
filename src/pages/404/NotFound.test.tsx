import { screen } from '@testing-library/react';
import NotFound from './NotFound';
import renderWithWrappers from '../../utils/tests/renderWithWrappers';

describe('NotFound Page', () => {
  it('Shows 404 page if the route is wrong', async () => {
    const route = '/qwerty';

    renderWithWrappers(<NotFound />, { route });

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
