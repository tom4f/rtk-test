import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Container } from '@/components/Container';
import styles from './Layout.module.scss';

import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className={styles['layout__content']}>
        <Container>{children}</Container>
      </div>
      <Footer />
    </>
  );
};
