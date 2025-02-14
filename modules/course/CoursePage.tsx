import React, { useRef, useCallback } from 'react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Spinner from '@/components/Spinner';
import Container from '@/components/Container';
import { VideoContainer } from './components/Video';
import VideoFilterContainer from './components/VideoFilter/VideoFilterContainer';
import {
  coursePageLoadingSelector,
  coursePageErrorSelector,
  courseDataSelector,
  getFilteredVideosSelector,
} from '@/store/selectors';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { RootState } from '@/store/store';
import { SlugType } from '@/store/slice';
import { VideoType } from '@/store/slice';

interface RowProps {
  index: number;
  style: React.CSSProperties;
  playlistVideos: VideoType[];
  toggleOpenCallback: (index: number) => void;
}

const Row: React.FC<RowProps> = React.memo(
  ({ index, style, playlistVideos, toggleOpenCallback }) => (
    <div style={style}>
      <VideoContainer
        key={playlistVideos[index].id}
        index={index}
        id={playlistVideos[index].id}
        title={playlistVideos[index].title}
        thumbnail={playlistVideos[index].thumbnails.medium.url}
        description={playlistVideos[index].description}
        toggleOpenCallback={toggleOpenCallback}
      />
    </div>
  )
);

Row.displayName = 'Row';

const CoursePage = () => {
  const listRef = useRef<List>(null);
  const params = useParams<{ slug: SlugType }>();
  const { slug } = params;

  const filteredVideos = useSelector(getFilteredVideosSelector(slug as string));

  const playlistVideos = (filteredVideos || []).map((video: VideoType) => ({
    id: video.id,
    title: video.title,
    thumbnails: { medium: { url: video.thumbnails?.medium?.url || '' } },
    description: video.description,
    open: video.open,
    completed: video.completed,
  }));

  const getItemSize = useCallback(
    (index: number): number =>
      playlistVideos[index].open === true ? 540 : 140,
    [playlistVideos]
  );

  const loading = useSelector((state: RootState) =>
    coursePageLoadingSelector(state, slug)
  );
  const error = useSelector((state: RootState) =>
    coursePageErrorSelector(state, slug)
  );

  const toggleOpenCallback = useCallback((index: number) => {
    if (listRef.current) {
      listRef.current?.resetAfterIndex(index);
    }
  }, []);

  const courseData = useSelector((state: RootState) =>
    courseDataSelector(state, slug)
  );

  const { title } = courseData;

  return (
    <article>
      <Container>
        <VideoFilterContainer />
        <h1>{title}</h1>
        {!loading && playlistVideos.length > 0 && (
          <div style={{ height: '60vh' }}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  ref={listRef}
                  height={height}
                  itemCount={playlistVideos.length}
                  itemSize={getItemSize}
                  width={width}
                >
                  {({ index, style }) => (
                    <Row
                      index={index}
                      style={style}
                      playlistVideos={playlistVideos}
                      toggleOpenCallback={toggleOpenCallback}
                    />
                  )}
                </List>
              )}
            </AutoSizer>
          </div>
        )}
        {loading && <Spinner />}
        {error && 'Error loading playlist'}
      </Container>
    </article>
  );
};

export default CoursePage;
