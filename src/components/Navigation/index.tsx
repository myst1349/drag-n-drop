import React from 'react';
import {NavLink} from 'react-router-dom';

import routes from '../../constants/routes';
import {IRoute} from '../../types/routes';

import styles from './navigation.module.css';

const Navigation = (): React.ReactElement => {
  const renderNavigationItems = routes.map((route: IRoute) => (
    <li key={`link-${route.label}`} className={styles.navItem}>
      <NavLink className={({isActive}) => (isActive ? styles.activeLink : '')} {...route.linkProps}>
        {route.label}
      </NavLink>
    </li>
  ));

  return <ul className={styles.wrapper}>{renderNavigationItems}</ul>;
};

export default Navigation;
