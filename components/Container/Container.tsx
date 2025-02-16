import React from 'react';
import styles from './Container.module.scss';

import { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => (
  <div className={styles.base}>{children}</div>
);
