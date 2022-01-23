import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import PageLayout from '../components/PageLayout';

import {IRoute} from '../types/route.types';
import routesConstants from '../constants/routes.constants';

function App() {
  const renderRedirectRoute = () => <Route path="*" element={<Navigate to="/" />} />;

  const renderRoutes = () => (
    <Routes>
      {routesConstants.map((route: IRoute) => (
        <Route key={`route-${route.label}`} {...route.routeProps} />
      ))}
      {renderRedirectRoute()}
    </Routes>
  );

  return (
    <Router>
      <PageLayout>{renderRoutes()}</PageLayout>
    </Router>
  );
}

export default App;
