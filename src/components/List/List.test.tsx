import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import List from './List';
import mocks from '../../utils/tests/mocks';

describe('List', () => {
  it('Present on the page', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <List items={mocks.pockemonsList.results} />
          </Provider>
        </MemoryRouter>,
      );
    });

    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

  it('Renders the specified number of cards', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <List items={mocks.pockemonsList.results} />
          </Provider>
        </MemoryRouter>,
      );
    });

    const list = screen.getByTestId('list');
    expect(list.children).toHaveLength(42);
  });

  it('Message is displayed if no cards are present', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <List items={[]} />
          </Provider>
        </MemoryRouter>,
      );
    });

    expect(screen.getByTestId('no-cards')).toBeInTheDocument();
  });
});
