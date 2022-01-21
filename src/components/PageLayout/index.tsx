import React from 'react';
import Navigation from '../Navigation';

import styles from './pageLayout.module.css';

interface LayoutProps {
  children: React.ReactChild;
}

const PageLayout = ({children}: LayoutProps): React.ReactElement => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Navigation />
      </header>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default PageLayout;
