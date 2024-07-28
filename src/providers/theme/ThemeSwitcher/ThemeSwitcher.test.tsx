import { screen, act } from '@testing-library/react';
import ThemeSwitcher from './ThemeSwitcher';
import renderWithWrappers from '../../../utils/tests/renderWithWrappers';

describe('ThemeSwitcher', () => {
  it('Present on the page', async () => {
    await act(async () => {
      renderWithWrappers(<ThemeSwitcher />, { route: '' });
    });

    expect(screen.getByTestId('ThemeSwitcher')).toBeInTheDocument();
  });
});
