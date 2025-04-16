'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { setCourses } from './playlist';

export const CoursesStoreProvider = ({
  children,
  initialCourses = {},
}: {
  children: React.ReactNode;
  initialCourses?: Record<string, number>;
}) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    storeRef.current.dispatch(setCourses(initialCourses));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
