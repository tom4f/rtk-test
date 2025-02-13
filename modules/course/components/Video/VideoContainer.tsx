import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isCompletedSelector, isOpenSelector } from '@/store/selectors';
import { toggleVideoCompleted, toggleVideoOpen } from '@/store/actions';
import Video from './Video';
import { State } from '@/store/selectors';
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

  const isCompleted = useSelector((state: State) =>
    isCompletedSelector(state, id)
  );
  const isOpen = useSelector((state: State) => isOpenSelector(state, id));

  const toggleCompleted = useCallback(() => {
    dispatch(toggleVideoCompleted({ id }));
    toggleOpenCallback(index);
  }, [dispatch, id, toggleOpenCallback, index]);

  const toggleOpen = useCallback(() => {
    dispatch(toggleVideoOpen({ id }));
    toggleOpenCallback(index);
  }, [dispatch, id, toggleOpenCallback, index]);

  return (
    <>
      VideoContainer
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
