import {
  screen, fireEvent, act, waitFor,
} from '@testing-library/react';
import Aside from './Aside';
import mocks from '../../utils/tests/mocks';
import renderWithWrappers from '../../utils/tests/renderWithWrappers';

const route = '/pockemon/1';

describe('Aside', () => {
  it('Present on the page', async () => {
    await act(async () => {
      renderWithWrappers(<Aside />, { route });
    });

    expect(screen.getByTestId('aside')).toBeInTheDocument();
  });

  it('Renders loader', async () => {
    renderWithWrappers(<Aside />, { route });

    waitFor(() => expect(screen.getByTestId('loader')).toBeInTheDocument());
  });

  it('Correctly displays the detailed card data', async () => {
    await act(async () => {
      renderWithWrappers(<Aside />, { route });
    });

    waitFor(() => expect(screen.getByText(new RegExp(`Name:\\+*${mocks.onePockemon.name}`, 'i'))).toBeInTheDocument());
  });

  it('Clicking the close button hides the component', async () => {
    await act(async () => {
      renderWithWrappers(<Aside />, { route });
    });

    const aside = screen.getByTestId('aside');
    const removeBtn = screen.getByTestId('close-detailed-card');

    expect(aside).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
    fireEvent.click(removeBtn);

    waitFor(() => expect(aside).not.toBeInTheDocument());
  });
});
