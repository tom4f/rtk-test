import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Wing Foiling Courses',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
