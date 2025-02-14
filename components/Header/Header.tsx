'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import Container from '@/components/Container';
import styles from './Header.module.scss';
import { coursesSelector } from '@/store/selectors';

const Header = () => {
  const courses = useSelector(coursesSelector);

  return (
    <header className={styles.base}>
      <Container>
        <div className={styles.logo}>Awesome project</div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            {courses.map((slug) => (
              <li key={slug}>
                <Link href={`/course/${slug}`}>{slug}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
