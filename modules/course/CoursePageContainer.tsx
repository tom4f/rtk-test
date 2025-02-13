'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylist } from '@/store/slice';
import {
  getFilteredVideosSelector,
  coursePageLoadingSelector,
  coursePageErrorSelector,
  playlistTitleSelector,
} from '@/store/selectors';
import CoursePage from './CoursePage';
import { AppDispatch } from '@/store/store';
interface CoursePageContainerProps {
  playlistId: string;
}

export const CoursePageContainer = ({
  playlistId,
}: CoursePageContainerProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const playlistVideos = (useSelector(getFilteredVideosSelector) || []).map(
    (video: {
      id: string;
      title: string;
      thumbnail: string;
      description: string;
      open: boolean;
    }) => ({
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      description: video.description,
      open: video.open,
    })
  );
  const loading = useSelector(coursePageLoadingSelector) as boolean;
  const error = useSelector(coursePageErrorSelector) as boolean;
  const title = useSelector(playlistTitleSelector) as string;

  console.log('Playlist State:', playlistVideos);

  useEffect(() => {
    if (!playlistId) {
      throw new Error('Missing playlist id in props');
    }
    dispatch(fetchPlaylist(playlistId));
  }, [dispatch, playlistId]);

  return (
    <>
      <CoursePage
        title={title}
        loading={loading}
        error={error}
        playlistVideos={playlistVideos}
      />
    </>
  );
};
