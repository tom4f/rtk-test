'use client';
import { useSelector } from 'react-redux';
import CoursesListItem from './CoursesListItem';
import { coursesSelector } from '@/store/selectors';

const CoursesList: React.FC = () => {
  const courses = useSelector(coursesSelector);

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

export default CoursesList;
