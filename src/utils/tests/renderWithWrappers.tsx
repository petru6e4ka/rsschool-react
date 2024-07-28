import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';

function renderWithWrappers(component: ReactNode, { route }: { route: string }) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Provider store={store}>{component}</Provider>
    </MemoryRouter>,
  );
}

export default renderWithWrappers;
