import { useMemo, useCallback } from 'react';
import { videoFilterSelector, playlistVideosSelector } from '@/store/courses';
import { setVideoFilter } from '@/store/courses';
import { VideoFilter } from './';
import { PlaylistState } from '@/store/courses';
import { useParams } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

export const VideoFilterContainer = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ slug: string }>();
  const { slug } = params;

  const setFilter = useCallback(
    (filterValue: PlaylistState['filterValue']) => {
      dispatch(setVideoFilter({ slug: slug, filterValue }));
    },
    [dispatch, slug]
  );

  const videoFilter = useAppSelector((state) =>
    videoFilterSelector(state, slug)
  );

  const allVideos = useAppSelector((state) =>
    playlistVideosSelector(state, slug)
  );

  const counts = useMemo(
    () => ({
      all: allVideos.length,
      completed: allVideos.filter((video) => video.completed).length,
      'not-completed': allVideos.filter((video) => !video.completed).length,
    }),
    [allVideos]
  );

  const filters = useMemo(
    () => [
      {
        onFilterSet: () => setFilter('all'),
        name: `All (${counts.all})`,
        active: videoFilter === 'all',
      },
      {
        onFilterSet: () => setFilter('completed'),
        name: `Completed (${counts.completed})`,
        active: videoFilter === 'completed',
      },
      {
        onFilterSet: () => setFilter('not-completed'),
        name: `Not completed (${counts['not-completed']})`,
        active: videoFilter === 'not-completed',
      },
    ],
    [videoFilter, setFilter, counts]
  );

  return <VideoFilter filters={filters} />;
};
