import { render, screen } from '@testing-library/react';
import ErrorNotification from './ErrorNotification';

describe('ErrorNotification', () => {
  it('Present on the page', () => {
    render(<ErrorNotification message="error" />);

    expect(screen.getByTestId('error-notification')).toBeInTheDocument();
  });
});
