import React from 'react';
import styles from './Container.module.scss';

import { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => (
  <div className={styles.base}>{children}</div>
);

export default Container;
