import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import List from './List';
import renderWithRouter from '../../utils/tests/renderWithRouter';

const mockPockemons = [
  {
    name: 'bulbasaur',
  },
  {
    name: 'charmeleon',
  },
  {
    name: 'wartortle',
  },
];

afterEach(() => {
  vi.clearAllMocks();
});

describe('List', () => {
  it('Present on the page', () => {
    renderWithRouter(<List items={mockPockemons} />);
    expect(screen.getByTestId('list')).toBeInTheDocument();
  });

  it('Renders the specified number of cards', () => {
    renderWithRouter(<List items={mockPockemons} />);

    const list = screen.getByTestId('list');

    expect(list.children).toHaveLength(3);
  });

  it('Message is displayed if no cards are present', () => {
    render(<List items={[]} />);

    expect(screen.getByTestId('no-cards')).toBeInTheDocument();
  });
});
