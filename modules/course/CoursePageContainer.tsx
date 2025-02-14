'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylist } from '@/store/slice';
import { courseDataSelector } from '@/store/selectors';
import CoursePage from './CoursePage';
import { AppDispatch } from '@/store/store';
import { useParams } from 'next/navigation';
import { SlugType } from '@/store/slice';
import { RootState } from '@/store/store';

export const CoursePageContainer = () => {
  const params = useParams<{ slug: SlugType }>();
  const { slug } = params;

  const dispatch = useDispatch<AppDispatch>();

  const courseData = useSelector((state: RootState) =>
    courseDataSelector(state, slug)
  );

  useEffect(() => {
    if (!courseData) {
      dispatch(fetchPlaylist(slug));
    }
  }, [dispatch, courseData, slug]);

  if (!courseData) return null;

  return (
    <>
      <CoursePage />
    </>
  );
};
