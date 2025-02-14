import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isCompletedSelector, isOpenSelector } from '@/store/selectors';
import { toggleVideoOpen, toggleVideoCompleted } from '@/store/slice';
import Video from './Video';
import { RootState } from '@/store/store';
import { useParams } from 'next/navigation';
import { SlugType } from '@/store/slice';
interface VideoContainerProps {
  id: string;
  toggleOpenCallback: (index: number) => void;
  index: number;
  description: string;
  title: string;
  thumbnail?: string;
}

export const VideoContainer: React.FC<VideoContainerProps> = ({
  id,
  toggleOpenCallback,
  index,
  description,
  title,
}) => {
  const dispatch = useDispatch();
  const params = useParams<{ slug: SlugType }>();
  const { slug } = params;

  const isCompleted = useSelector((state: RootState) =>
    isCompletedSelector(state, slug, id)
  );

  const isOpen = useSelector((state: RootState) =>
    isOpenSelector(state, slug, id)
  );

  const toggleCompleted = useCallback(() => {
    dispatch(toggleVideoCompleted({ slug: slug, id }));
    toggleOpenCallback(index);
  }, [dispatch, id, toggleOpenCallback, index, slug]);

  const toggleOpen = useCallback(() => {
    dispatch(toggleVideoOpen({ slug: slug, id }));
    toggleOpenCallback(index);
  }, [dispatch, id, toggleOpenCallback, index, slug]);

  return (
    <>
      <Video
        id={id}
        isCompleted={isCompleted}
        isOpen={isOpen}
        toggleCompleted={toggleCompleted}
        toggleOpen={toggleOpen}
        description={description}
        title={title}
      />
    </>
  );
};
