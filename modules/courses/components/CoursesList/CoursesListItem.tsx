import styles from "./CoursesListItem.module.scss";

type Props = {
  slug: string;
};

const CoursesListItem: React.FC<Props> = ({ slug }) => {
  return (
    <li className={styles["courses-list-item"]}>
      {slug}
      <button>remove course</button>
    </li>
  );
};

export default CoursesListItem;
