import { screen } from '@testing-library/react';
import ThemeSwitcher from './ThemeSwitcher';
import renderWithWrappers from '../../../utils/tests/renderWithWrappers';

describe('ThemeSwitcher', () => {
  it('Present on the page', async () => {
    renderWithWrappers(<ThemeSwitcher />, { route: '' });

    expect(screen.getByTestId('ThemeSwitcher')).toBeInTheDocument();
  });
});
