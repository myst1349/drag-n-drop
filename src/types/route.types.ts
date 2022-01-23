import React from 'react';

type LinkToObject = {
  pathname: string;
  search: string;
  hash: string;
  state: object;
};

interface ILinkProps {
  to: string | LinkToObject;
  end?: boolean;
}

interface IRouteProps {
  path: string;
  element: React.ReactElement;
  exact?: boolean;
  strict?: boolean;
}

export interface IRoute {
  label: string;
  linkProps: ILinkProps;
  routeProps: IRouteProps;
}
