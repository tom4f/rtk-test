import CoursesStoreProvider from "@/modules/course/storeProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course",
  description: "Simple interview app for SiteOne",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CoursesStoreProvider>{children}</CoursesStoreProvider>;
}
