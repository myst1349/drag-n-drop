import React from 'react';
import Navigation from '../Navigation';

import styles from './pageLayout.module.css';

interface ILayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<ILayoutProps> = ({children}) => {
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
