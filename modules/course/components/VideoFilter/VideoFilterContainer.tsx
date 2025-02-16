import { useMemo, useCallback } from 'react';
import { videoFilterSelector } from '@/store/courses';
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

  const filters = useMemo(
    () => [
      {
        onFilterSet: () => setFilter('all'),
        name: 'All',
        active: videoFilter === 'all',
      },
      {
        onFilterSet: () => setFilter('completed'),
        name: 'Completed',
        active: videoFilter === 'completed',
      },
      {
        onFilterSet: () => setFilter('not-completed'),
        name: 'Not completed',
        active: videoFilter === 'not-completed',
      },
    ],
    [videoFilter, setFilter]
  );

  return <VideoFilter filters={filters} />;
};
