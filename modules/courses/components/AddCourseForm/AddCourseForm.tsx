type Props = {};

const AddCourseForm: React.FC<Props> = () => {
  return (
    <form>
      <h2>Add a new course</h2>
      <label>
        youtube playlist id:
        <input type="text" />
      </label>
      <button type="submit">Add course</button>
    </form>
  );
};

export default AddCourseForm;
