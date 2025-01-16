import ReactPlayer from "react-player";
import styles from './VideoPlayer.module.scss'

type Props = {
  url: string;
};

const VideoPlayer: React.FC<Props> = ({ url }) => {
  return <div className={styles['video-player']}> <ReactPlayer url={url} controls width='100%' height="100%" /></div>;
};

export default VideoPlayer;
