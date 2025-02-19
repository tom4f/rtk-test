'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { fetchPlaylist } from '@/store/courses';
import { coursesSelector } from '@/store/courses';
import styles from './../CoursesList/CoursesListItem.module.scss';
//import { fetchAllPlaylists } from '@/store/playlist';
import { useGetAllPlaylistsQuery } from '@/store/apiServices';
import { useAppSelector } from '@/store/hooks';

export const AddCourseForm = () => {
  // Use the RTK Query hook to fetch playlists
  const {
    data,
    error: RTKQueryError,
    isLoading: RTKQueryIsLoading,
  } = useGetAllPlaylistsQuery();

  const availableCoursesRTKQuery = Object.keys(data || {}) as string[];
  console.log({ RTKQueryIsLoading }, { RTKQueryError }, data);

  const dispatch = useAppDispatch();

  const { playlistIds, loading, error } = useAppSelector(
    (state) => state.playlist
  );

  /*   useEffect(() => {
    if (!playlistIds.length) {
      dispatch(fetchAllPlaylists());
    }
  }, [dispatch, playlistIds.length]); */

  const availableCourses = Object.keys(playlistIds) as string[];

  const [playlistId, setPlaylistId] = useState('');

  const courses = useAppSelector(coursesSelector);

  if (loading) return <p>Loading playlists...</p>;
  if (error) return <p>Error: {error}</p>;

  const notAddedCourses = availableCourses.filter(
    (slug) => !courses.includes(slug)
  );

  if (notAddedCourses.length === 0) {
    return <p>All available courses are already added!</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistId(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playlistId) return;
    if (availableCourses.includes(playlistId)) {
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
      <h2>Our offer RTK Query test</h2>
      -- {RTKQueryIsLoading} --
      <ul>
        {availableCoursesRTKQuery.map((slug) => (
          <li key={slug} className={styles['courses-list-item']}>
            {slug}
            <button onClick={() => dispatch(fetchPlaylist(slug))}>Add</button>
          </li>
        ))}
      </ul>
    </>
  );
};
