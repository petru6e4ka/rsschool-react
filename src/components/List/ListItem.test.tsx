import { act, screen } from '@testing-library/react';
import ListItem from './ListItem';
import mocks from '../../utils/tests/mocks';
import renderWithWrappers from '../../utils/tests/renderWithWrappers';

describe('ListItem', () => {
  it('Present on the page', async () => {
    await act(async () => {
      renderWithWrappers(<ListItem item={mocks.pockemonsList.results[0]} />, { route: '' });
    });

    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('Renders the relevant card data', async () => {
    await act(async () => {
      renderWithWrappers(<ListItem item={mocks.pockemonsList.results[0]} />, { route: '' });
    });

    const openLink = screen.getByTestId('open-detailed_card');
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(openLink).toHaveAttribute('href', '/pockemon/1');
  });
});
