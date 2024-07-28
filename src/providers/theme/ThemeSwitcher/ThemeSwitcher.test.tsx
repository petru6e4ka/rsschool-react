import { screen, render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ThemeSwitcher from './ThemeSwitcher';
import { store } from '../../../store';

describe('ThemeSwitcher', () => {
  it('Present on the page', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <ThemeSwitcher />
          </Provider>
        </MemoryRouter>,
      );
    });

    expect(screen.getByTestId('ThemeSwitcher')).toBeInTheDocument();
  });
});
