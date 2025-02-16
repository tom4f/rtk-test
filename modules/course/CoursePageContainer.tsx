'use client';

import { useEffect } from 'react';
import { fetchPlaylist } from '@/store/courses';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { CoursePage } from './CoursePage';
import { useParams } from 'next/navigation';

export const CoursePageContainer = () => {
  const { slug } = useParams() as { slug?: string };
  const dispatch = useAppDispatch();
  const courseData = useAppSelector((state) =>
    slug ? state.coursePage[slug] : undefined
  );

  useEffect(() => {
    if (slug && !courseData) {
      dispatch(fetchPlaylist(slug));
    }
  }, [dispatch, courseData, slug]);

  if (!slug || !courseData) return <>Something wrong...</>;

  return <CoursePage />;
};
