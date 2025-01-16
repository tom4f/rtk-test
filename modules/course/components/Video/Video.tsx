import React from 'react'
import Collapse from '@/components/Collapse'
import styles from './Video.module.scss'
import VideoPlayer from '../VideoPlayer/VideoPlayer'

const Video = ({
  video,
  toggleCompleted,
  isCompleted,
  toggleOpen,
  isOpen,
  isDisplayed,
  id,
  title,
  description,
  thumbnail,
}) => {
  return (
    <>
      {
        <div className={styles['video']}>
          <label className={styles['video__completed']}>
            <input
              className={styles['video__completed-checkbox']}
              type="checkbox"
              checked={isCompleted ? 1 : 0}
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
            <button onClick={toggleOpen} type="button">
              {isOpen ? 'show less' : 'show more'}
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default React.memo(Video)
