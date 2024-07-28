import {
  act, fireEvent, screen, waitForElementToBeRemoved,
} from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import { SEARCH_KEY } from '../../components/Search/Search';
import Aside from '../../components/Aside/Aside';
import renderWithWrappers from '../../utils/tests/renderWithWrappers';

beforeEach(() => {
  localStorage.setItem(SEARCH_KEY, '');
});

afterEach(() => {
  localStorage.removeItem(SEARCH_KEY);
});

describe('Home', () => {
  it('Main is present on the page', async () => {
    await act(async () => {
      renderWithWrappers(<Home />, { route: '' });
    });

    expect(screen.getByTestId('main')).toBeInTheDocument();
  });

  it('Clicking on a link opens a detailed card component', async () => {
    await act(async () => {
      renderWithWrappers(
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="pockemon/:pockemon" element={<Aside />} />
        </Routes>,
        { route: '/' },
      );
    });

    await waitForElementToBeRemoved(screen.getAllByTestId('loader'));

    const openLink = screen.getAllByTestId('open-detailed_card');

    expect(screen.getByTestId('main')).not.toContainElement(screen.queryByTestId('aside'));
    fireEvent.click(openLink[0]);
    expect(await screen.findByTestId('aside')).toBeInTheDocument();
  });
});
