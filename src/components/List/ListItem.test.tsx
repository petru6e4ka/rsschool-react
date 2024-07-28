import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ListItem from './ListItem';
import { store } from '../../store';
import mocks from '../../utils/tests/mocks';

describe('ListItem', () => {
  it('Present on the page', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <ListItem item={mocks.pockemonsList.results[0]} />
          </Provider>
        </MemoryRouter>,
      );
    });

    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('Renders the relevant card data', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <ListItem item={mocks.pockemonsList.results[0]} />
          </Provider>
        </MemoryRouter>,
      );
    });

    const openLink = screen.getByTestId('open-detailed_card');
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(openLink).toHaveAttribute('href', '/pockemon/1');
  });
});
