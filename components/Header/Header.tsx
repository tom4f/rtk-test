'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Container } from '@/components/Container';
import styles from './Header.module.scss';
import { coursesSelector } from '@/store/courses';

export const Header = () => {
  const courses = useSelector(coursesSelector);

  return (
    <header className={styles.base}>
      <Container>
        <div className={styles.logo}>Wing Foil Project</div>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href='/add-video'>Add video</Link>
            </li>
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
