import CoursesListItem from "./CoursesListItem";

const CoursesList: React.FC = () => {
  return (
    <ul>
      <CoursesListItem slug="java" />
      <CoursesListItem slug="free-code-camp" />
      <CoursesListItem slug="ten-days-of-javascript" />
    </ul>
  );
};

export default CoursesList;
