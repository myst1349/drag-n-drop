import Home from '../pages/Home';
import Notes from '../pages/Notes';

import {IRoute} from '../types/route.types';

const routesConstants: Array<IRoute> = [
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

export default routesConstants;
