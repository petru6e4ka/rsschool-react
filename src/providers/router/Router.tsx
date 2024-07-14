import { useRoutes } from 'react-router-dom';
import { routes } from '../../configs/router/router';

function Router() {
  return useRoutes(routes);
}

export default Router;
