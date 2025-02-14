import { useDispatch } from 'react-redux';
import { removeCourse } from '@/store/slice';
import styles from './CoursesListItem.module.scss';

type Props = {
  slug: string;
};

const CoursesListItem: React.FC<Props> = ({ slug }) => {
  const dispatch = useDispatch();

  return (
    <li className={styles['courses-list-item']}>
      {slug}
      <button onClick={() => dispatch(removeCourse({ slug }))}>
        Remove Course
      </button>
    </li>
  );
};

export default CoursesListItem;
