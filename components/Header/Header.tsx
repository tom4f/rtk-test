import React from 'react'
import Link from 'next/link'
import Container from '@/components/Container'
import styles from './Header.module.scss'

const Header = () => (
  <header className={styles.base}>
    <Container>
      <div className={styles.logo}>Awesome project</div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/course/ten-days-of-javascript">10 days of JavaScript</Link>
          </li>
          <li>
            <Link href="/course//java">Java</Link>
          </li>
          <li>
            <Link href="/course/free-code-camp">Free Code Camp</Link>
          </li>
        </ul>
      </nav>
    </Container>
  </header>
)

export default Header
