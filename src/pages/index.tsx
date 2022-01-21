import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import PageLayout from '../components/PageLayout';

import {IRoute} from '../types/route';
import routes from '../constants/routes';

function App() {
  const renderRedirectRoute = () => <Route path="*" element={<Navigate to="/" />} />;

  const renderRoutes = () => (
    <Routes>
      {routes.map((route: IRoute) => (
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
