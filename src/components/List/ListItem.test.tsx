import { screen } from '@testing-library/react';
import renderWithRouter from '../../utils/tests/renderWithRouter';
import ListItem from './ListItem';

const pockemon = {
  name: 'bulbasaur',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
};

describe('ListItem', () => {
  it('Present on the page', () => {
    renderWithRouter(<ListItem item={pockemon} />);

    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('Renders the relevant card data', () => {
    renderWithRouter(<ListItem item={pockemon} />);

    const openLink = screen.getByTestId('open-detailed_card');

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(openLink).toHaveAttribute('href', '/pockemon/1');
  });
});
