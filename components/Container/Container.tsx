import React from 'react'
import styles from './Container.module.scss'

const Container = ({ children }) => (
  <div className={styles.base}>{children}</div>
)

export default Container
