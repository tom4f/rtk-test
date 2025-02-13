import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { videoFilterSelector } from '@/store/selectors';
import { setVideoFilter } from '@/store/actions';
import VideoFilter from './VideoFilter';

const VideoFilterContainer = () => {
  const dispatch = useDispatch();
  const videoFilter = useSelector(videoFilterSelector);

  const setFilter = (filterValue: string) => {
    dispatch(setVideoFilter({ filterValue }));
  };

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
    [videoFilter]
  );

  return <VideoFilter filters={filters} />;
};

export default VideoFilterContainer;
