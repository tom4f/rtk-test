import { useAppDispatch } from '@/store/hooks';
import { removeCourse } from '@/store/courses';
import styles from './CoursesListItem.module.scss';

type Props = {
  slug: string;
};

export const CoursesListItem = ({ slug }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <li className={styles['courses-list-item']}>
      {slug}
      <button onClick={() => dispatch(removeCourse({ slug }))}>
        Remove Course
      </button>
    </li>
  );
};
