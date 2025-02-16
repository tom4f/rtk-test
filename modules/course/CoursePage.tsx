import React, { useRef, useCallback, useMemo, useEffect } from 'react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Spinner } from '@/components/Spinner';
import { Container } from '@/components/Container';
import { VideoContainer } from './components/Video';
import { VideoFilterContainer } from './components/VideoFilter';
import {
  coursePageLoadingSelector,
  coursePageErrorSelector,
  courseDataSelector,
  getFilteredVideosSelector,
  isOpenMapSelector,
} from '@/store/courses';
import { useParams } from 'next/navigation';
import { VideoType } from '@/store/courses';
import { useAppSelector } from '@/store/hooks';

type RowProps = {
  index: number;
  style: React.CSSProperties;
  playlistVideos: VideoType[];
};

const Row: React.FC<RowProps> = React.memo(
  ({ index, style, playlistVideos }) => {
    const { id, title, thumbnails, description } = playlistVideos[index];

    return (
      <div style={style}>
        <VideoContainer
          key={id}
          index={index}
          id={id}
          title={title}
          thumbnail={thumbnails.medium.url}
          description={description}
        />
      </div>
    );
  }
);

Row.displayName = 'Row';

export const CoursePage = () => {
  const params = useParams<{ slug: string }>();
  const { slug } = params;

  const filteredVideos = useAppSelector(getFilteredVideosSelector(slug));

  const listRef = useRef<List>(null);
  const isOpenMap = useAppSelector((state) => isOpenMapSelector(state, slug));
  const previousIsOpenMapRef = useRef(isOpenMap);

  useEffect(() => {
    if (listRef.current) {
      const firstChangedIndex = Object.keys(isOpenMap).findIndex(
        (id) => isOpenMap[id]
      );
      if (firstChangedIndex !== -1) {
        listRef.current.resetAfterIndex(firstChangedIndex, false);
      }
    }
  }, [isOpenMap]);

  const playlistVideos = useMemo(
    () =>
      (filteredVideos || []).map((video: VideoType) => ({
        id: video.id,
        title: video.title,
        thumbnails: { medium: { url: video.thumbnails?.medium?.url || '' } },
        description: video.description,
        open: video.open,
        completed: video.completed,
      })),
    [filteredVideos]
  );

  const getItemSize = useCallback(
    (index: number): number =>
      isOpenMap[playlistVideos[index].id] ? 540 : 140,
    [isOpenMap, playlistVideos]
  );

  useEffect(() => {
    if (listRef.current) {
      const changedIndex = Object.keys(isOpenMap).findIndex(
        (id) => isOpenMap[id] !== previousIsOpenMapRef.current?.[id]
      );

      if (changedIndex !== -1) {
        listRef.current.resetAfterIndex(changedIndex, true);
      }
    }

    previousIsOpenMapRef.current = isOpenMap;
  }, [isOpenMap]);

  const loading = useAppSelector((state) =>
    coursePageLoadingSelector(state, slug)
  );
  const error = useAppSelector((state) => coursePageErrorSelector(state, slug));

  const courseData = useAppSelector((state) => courseDataSelector(state, slug));

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
