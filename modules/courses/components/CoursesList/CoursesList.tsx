'use client';
import { useAppSelector } from '@/store/hooks';
import { CoursesListItem } from './CoursesListItem';
import { coursesSelector } from '@/store/courses';

export const CoursesList = () => {
  const courses = useAppSelector(coursesSelector);

  if (courses.length === 0) {
    return <p>no courses added...</p>;
  }

  return (
    <ul>
      {courses.map((slug) => (
        <CoursesListItem key={slug} slug={slug} />
      ))}
    </ul>
  );
};
