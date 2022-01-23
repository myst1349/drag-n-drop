import React from 'react';
import {NavLink} from 'react-router-dom';

import routesConstants from '../../constants/routes.constants';
import {IRoute} from '../../types/route.types';

import styles from './navigation.module.css';

const Navigation: React.FC = () => {
  const renderNavigationItems = routesConstants.map((route: IRoute) => (
    <li key={`link-${route.label}`} className={styles.navItem}>
      <NavLink className={({isActive}) => (isActive ? styles.activeLink : '')} {...route.linkProps}>
        {route.label}
      </NavLink>
    </li>
  ));

  return <ul className={styles.wrapper}>{renderNavigationItems}</ul>;
};

export default Navigation;
