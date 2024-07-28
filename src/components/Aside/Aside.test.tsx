import {
  screen, render, fireEvent, act, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Aside from './Aside';
import { store } from '../../store';
import mocks from '../../utils/tests/mocks';

const route = '/pockemon/1';

describe('Aside', () => {
  it('Present on the page', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <Aside />
          </Provider>
        </MemoryRouter>,
      );
    });

    expect(screen.getByTestId('aside')).toBeInTheDocument();
  });

  it('Renders loader', async () => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <Provider store={store}>
          <Aside />
        </Provider>
      </MemoryRouter>,
    );

    waitFor(() => expect(screen.getByTestId('loader')).toBeInTheDocument());
  });

  it('Correctly displays the detailed card data', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <Aside />
          </Provider>
        </MemoryRouter>,
      );
    });

    waitFor(() => expect(screen.getByText(new RegExp(`Name:\\+*${mocks.onePockemon.name}`, 'i'))).toBeInTheDocument());
  });

  it('Clicking the close button hides the component', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[route]}>
          <Provider store={store}>
            <Aside />
          </Provider>
        </MemoryRouter>,
      );
    });

    const aside = screen.getByTestId('aside');
    const removeBtn = screen.getByTestId('close-detailed-card');

    expect(aside).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
    fireEvent.click(removeBtn);

    waitFor(() => expect(aside).not.toBeInTheDocument());
  });
});
