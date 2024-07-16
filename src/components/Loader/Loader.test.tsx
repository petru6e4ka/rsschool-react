import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('Present on the page', () => {
    render(<Loader />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
