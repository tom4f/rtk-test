import React from 'react';
import classnames from 'classnames';
import styles from './Spinner.module.scss';

export const Spinner = ({ size = 'normal' }) => (
  <div className={classnames(styles.base, styles[size])}>loading...</div>
);
