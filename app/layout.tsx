import { Layout } from '@/components/Layout/Layout';
import type { Metadata } from 'next';
import { CoursesStoreProvider } from '@/store/storeProvider';

export const metadata: Metadata = {
  title: 'SiteOne interview app',
  description: 'Simple interview app for SiteOne',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <CoursesStoreProvider>
          <Layout>{children}</Layout>
        </CoursesStoreProvider>
      </body>
    </html>
  );
}
