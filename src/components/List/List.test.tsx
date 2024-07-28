import { act, screen } from '@testing-library/react';
import List from './List';
import mocks from '../../utils/tests/mocks';
import renderWithWrappers from '../../utils/tests/renderWithWrappers';

describe('List', () => {
  it('Present on the page', async () => {
    await act(async () => {
      renderWithWrappers(<List items={mocks.pockemonsList.results} />, { route: '' });
    });

    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

  it('Renders the specified number of cards', async () => {
    await act(async () => {
      renderWithWrappers(<List items={mocks.pockemonsList.results} />, { route: '' });
    });

    const list = screen.getByTestId('list');
    expect(list.children).toHaveLength(42);
  });

  it('Message is displayed if no cards are present', async () => {
    await act(async () => {
      renderWithWrappers(<List items={[]} />, { route: '' });
    });

    expect(screen.getByTestId('no-cards')).toBeInTheDocument();
  });
});
