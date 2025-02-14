'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylist } from '@/store/slice';
import { coursesSelector } from '@/store/selectors';
import styles from './../CoursesList/CoursesListItem.module.scss';
import { SlugType } from '@/store/slice';
import { AppDispatch } from '@/store/store';
import { playlistIds } from '@/store/slice';

const availableCourses = Object.keys(playlistIds) as SlugType[];

const AddCourseForm = () => {
  const [playlistId, setPlaylistId] = useState<SlugType | ''>('');
  const dispatch = useDispatch<AppDispatch>();

  const courses = useSelector(coursesSelector);

  const notAddedCourses = availableCourses.filter(
    (slug) => !courses.includes(slug)
  );

  if (notAddedCourses.length === 0) {
    return <p>All available courses are already added!</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistId(e.target.value as SlugType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playlistId) return;
    if (availableCourses.includes(playlistId as SlugType)) {
      dispatch(fetchPlaylist(playlistId));
    }
    setPlaylistId('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add a new course</h2>
        <label>
          YouTube Playlist ID:
          <input type='text' value={playlistId} onChange={handleChange} />
        </label>
        <button type='submit'>Add course</button>
      </form>
      <h2>Our offer</h2>
      <ul>
        {notAddedCourses.map((slug) => (
          <li key={slug} className={styles['courses-list-item']}>
            {slug}
            <button onClick={() => dispatch(fetchPlaylist(slug))}>Add</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AddCourseForm;
