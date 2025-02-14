import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { videoFilterSelector } from '@/store/selectors';
import { setVideoFilter } from '@/store/slice';
import VideoFilter from './VideoFilter';
import { PlaylistState } from '@/store/slice';
import { useParams } from 'next/navigation';
import { SlugType } from '@/store/slice';
import { RootState } from '@/store/store';

const VideoFilterContainer = () => {
  const dispatch = useDispatch();
  const params = useParams<{ slug: SlugType }>();
  const { slug } = params;

  const setFilter = useCallback(
    (filterValue: PlaylistState['filterValue']) => {
      dispatch(setVideoFilter({ slug: slug, filterValue }));
    },
    [dispatch, slug]
  );

  const videoFilter = useSelector((state: RootState) =>
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

export default VideoFilterContainer;
