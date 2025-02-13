import React, { useRef, useCallback } from 'react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Spinner from '@/components/Spinner';
import Container from '@/components/Container';
import { VideoContainer } from './components/Video';
import VideoFilterContainer from './components/VideoFilter/VideoFilterContainer';

interface CoursePageProps {
  title: string;
  loading: boolean;
  error: boolean;
  playlistVideos: {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    open: boolean;
  }[];
}

interface RowProps {
  index: number;
  style: React.CSSProperties;
  playlistVideos: {
    id: string;
    title: string;
    thumbnail: string;
    description: string;
    open: boolean;
  }[];
  toggleOpenCallback: (index: number) => void;
}

const Row: React.FC<RowProps> = React.memo(
  ({ index, style, playlistVideos, toggleOpenCallback }) => (
    <div style={style}>
      CoursePage
      <VideoContainer
        key={playlistVideos[index].id}
        index={index}
        id={playlistVideos[index].id}
        title={playlistVideos[index].title}
        thumbnail={playlistVideos[index].thumbnail}
        description={playlistVideos[index].description}
        toggleOpenCallback={toggleOpenCallback}
      />
    </div>
  )
);

Row.displayName = 'Row';

const CoursePage: React.FC<CoursePageProps> = ({
  title,
  loading,
  error,
  playlistVideos,
}) => {
  const listRef = useRef<List>(null);

  const getItemSize = useCallback(
    (index: number): number =>
      playlistVideos[index].open === true ? 540 : 140,
    [playlistVideos]
  );

  const toggleOpenCallback = useCallback((index: number) => {
    if (listRef.current) {
      listRef.current?.resetAfterIndex(index);
    }
  }, []);

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
