import { Layout } from '@/components/Layout/Layout';
import type { Metadata } from 'next';
import { CoursesStoreProvider } from '@/store/storeProvider';

export const metadata: Metadata = {
  title: 'Wing Foil app',
  description: 'Wing Foil Youtube Playlist',
};

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.frymburk.com/api-siteone/slug/index.php'
    : 'http://localhost:3000/api/slug/index.php';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await fetch(API_URL, { next: { revalidate: 10 } });
  const courses = await response.json();
  console.log(response.url);

  return (
    <html>
      <body>
        <CoursesStoreProvider initialCourses={courses}>
          <Layout>{children}</Layout>
        </CoursesStoreProvider>
      </body>
    </html>
  );
}
