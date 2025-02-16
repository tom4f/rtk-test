import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.scss';

type Props = {
  url: string;
  onEnded: () => void;
};

export const VideoPlayer: React.FC<Props> = ({ url, onEnded }) => {
  return (
    <div className={styles['video-player']}>
      <ReactPlayer
        url={url}
        controls
        width='100%'
        height='100%'
        onEnded={onEnded}
      />
    </div>
  );
};
