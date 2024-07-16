import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

function renderWithRouter(component: ReactNode) {
  return render(<MemoryRouter>{component}</MemoryRouter>);
}

export default renderWithRouter;
