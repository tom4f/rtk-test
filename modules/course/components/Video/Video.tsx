import React from 'react';
import Collapse from '@/components/Collapse';
import styles from './Video.module.scss';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

interface VideoProps {
  toggleCompleted: () => void;
  isCompleted: boolean;
  toggleOpen: () => void;
  isOpen: boolean;
  id: string;
  title: string;
  description: string;
}

const Video: React.FC<VideoProps> = ({
  toggleCompleted,
  isCompleted,
  toggleOpen,
  isOpen,
  id,
  title,
  description,
}) => {
  return (
    <>
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
              <VideoPlayer url={`https://www.youtube.com/watch?v=${id}`} />
              <p className={styles['video__description']}>{description}</p>
            </Collapse>
          )}
          <button onClick={toggleOpen} type='button'>
            {isOpen ? 'show less' : 'show more'}
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(Video);
