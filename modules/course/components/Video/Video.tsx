import React from 'react';
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
import { getFilteredVideosSelector } from '@/store/courses';
import Image from 'next/image';

type VideoProps = {
  id: string;
};

export const Video: React.FC<VideoProps> = React.memo(({ id }: VideoProps) => {
  const dispatch = useDispatch();
  const params = useParams<{ slug: string }>();
  const { slug } = params;

  const video = useAppSelector((state) =>
    getFilteredVideosSelector(slug)(state).find((video) => video.id === id)
  );

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

  if (!video) {
    return null;
  }

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
        <div className={styles['video__header']}>
          {!video.open && (
            <Image
              src={video.thumbnails.default.url}
              alt={video.title}
              width={120}
              height={90}
              className={styles['video__thumbnail']}
            />
          )}
          <h2 className={styles['video__title']}>{video.title}</h2>
        </div>
        {video.open && (
          <>
            <VideoPlayer
              url={`https://www.youtube-nocookie.com/watch?v=${id}`}
              onEnded={handleVideoEnd}
            />
            <p className={styles['video__description']}>{video.description}</p>
          </>
        )}
        <button onClick={toggleOpen} type='button'>
          {video.open ? 'show less' : 'show more'}
        </button>
      </div>
    </div>
  );
});

Video.displayName = 'Video';
