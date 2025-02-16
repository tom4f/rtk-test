import React from 'react';
import { Collapse } from '@/components/Collapse';
import styles from './Video.module.scss';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';
import {
  markVideoCompleted,
  toggleVideoCompleted,
  toggleVideoOpen,
} from '@/store/courses';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/hooks';
import { isCompletedSelector } from '@/store/courses';
import { useParams } from 'next/navigation';

type VideoProps = {
  isOpen: boolean;
  id: string;
  title: string;
  description: string;
};

export const Video: React.FC<VideoProps> = React.memo(
  ({ isOpen, id, title, description }: VideoProps) => {
    const dispatch = useDispatch();
    const params = useParams<{ slug: string }>();
    const { slug } = params;

    const isCompleted = useAppSelector((state) =>
      isCompletedSelector(state, slug, id)
    );

    const handleVideoEnd = () => {
      if (!isCompleted) {
        dispatch(markVideoCompleted(id));
      }
    };

    const toggleCompleted = () => {
      dispatch(toggleVideoCompleted({ slug: slug, id }));
    };

    const toggleOpen = () => {
      dispatch(toggleVideoOpen({ slug: slug, id }));
    };

    return (
      <div className={styles['video']}>
        <label className={styles['video__completed']}>
          <input
            className={styles['video__completed-checkbox']}
            type='checkbox'
            checked={isCompleted ? true : false}
            onChange={toggleCompleted}
          />
        </label>
        <div className={styles['video__content']}>
          <h2 className={styles['video__title']}>{title}</h2>
          {isOpen && (
            <Collapse open={isOpen}>
              <VideoPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                onEnded={handleVideoEnd}
              />
              <p className={styles['video__description']}>{description}</p>
            </Collapse>
          )}
          <button onClick={toggleOpen} type='button'>
            {isOpen ? 'show less' : 'show more'}
          </button>
        </div>
      </div>
    );
  }
);

Video.displayName = 'Video';
