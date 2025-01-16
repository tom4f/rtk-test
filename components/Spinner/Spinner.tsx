import React from 'react'
import c from 'classnames'
import styles from './Spinner.module.scss'

const Spinner = ({ size = 'normal' }) => (
  <div className={c(styles.base, styles[size])}>loading...</div>
)

export default Spinner
