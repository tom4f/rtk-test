import React from 'react';
import styles from './VideoFilter.module.scss';

type Filters = {
  onFilterSet: () => void;
  name: string;
  active: boolean;
}[];

export const VideoFilter: React.FC<{ filters: Filters }> = ({ filters }) => {
  return (
    <div className={styles['video-filter']}>
      Filter:
      {filters.map(({ onFilterSet, name, active }) => {
        return (
          <button
            className={`${styles['video-filter__filter-button']} ${
              active ? styles['video-filter__filter-button--active'] : ''
            }`}
            type='button'
            onClick={onFilterSet}
            key={name}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
