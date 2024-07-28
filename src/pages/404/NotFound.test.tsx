import { MemoryRouter } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound Page', () => {
  it('Shows 404 page if the route is wrong', async () => {
    const wrongRoute = '/qwerty';

    await act(async () => {
      render(
        <MemoryRouter initialEntries={[wrongRoute]}>
          <NotFound />
        </MemoryRouter>,
      );
    });

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
