import Home from '../pages/Home';
import Notes from '../pages/Notes';

import {Routes} from '../types/routes';

const routes: Routes = [
  {
    label: 'Home',
    linkProps: {
      to: '/',
    },
    routeProps: {
      path: '/',
      element: <Home />,
    },
  },
  {
    label: 'Notes',
    linkProps: {
      to: '/notes',
    },
    routeProps: {
      path: '/notes',
      element: <Notes />,
    },
  },
];

export default routes;
