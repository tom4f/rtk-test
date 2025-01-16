import AddCourseForm from "./components/AddCourseForm/AddCourseForm";
import CoursesList from "./components/CoursesList/CoursesList";

type Props = {};

const CoursesPage: React.FC<Props> = () => {
  return (
    <div>
      <h1>Online courses tracker</h1>
      <h2>My courses</h2>
      <CoursesList />

      <AddCourseForm />
    </div>
  );
};

export default CoursesPage;
