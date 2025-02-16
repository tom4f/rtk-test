import React, { useRef, useCallback, useEffect } from 'react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Spinner } from '@/components/Spinner';
import { Container } from '@/components/Container';
import { VideoFilterContainer } from './components/VideoFilter';
import {
  coursePageLoadingSelector,
  coursePageErrorSelector,
  courseDataSelector,
  getFilteredVideosSelector,
  isOpenMapSelector,
} from '@/store/courses';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { Video } from './components/Video';

type RowProps = {
  style: React.CSSProperties;
  id: string;
};

const Row: React.FC<RowProps> = React.memo(({ style, id }) => {
  return (
    <div style={style}>
      <Video id={id} />
    </div>
  );
});

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
      const changedIndex = Object.keys(isOpenMap).findIndex(
        (id) => isOpenMap[id] !== previousIsOpenMapRef.current?.[id]
      );

      if (changedIndex !== -1) {
        listRef.current.resetAfterIndex(changedIndex, true);
      }
    }

    previousIsOpenMapRef.current = isOpenMap;
  }, [isOpenMap]);

  const videoIds = filteredVideos.map((video) => video.id);

  const getItemSize = useCallback(
    (index: number): number => (isOpenMap[videoIds[index]] ? 540 : 140),
    [isOpenMap, videoIds]
  );

  const loading = useAppSelector((state) =>
    coursePageLoadingSelector(state, slug)
  );
  const error = useAppSelector((state) => coursePageErrorSelector(state, slug));
  const courseData = useAppSelector((state) => courseDataSelector(state, slug));

  return (
    <article>
      <Container>
        <VideoFilterContainer />
        <h1>{courseData.title}</h1>
        {!loading && videoIds.length > 0 && (
          <div style={{ height: '60vh' }}>
            <AutoSizer>
              {({ height, width }) => (
                <List
                  ref={listRef}
                  height={height}
                  itemCount={videoIds.length}
                  itemSize={getItemSize}
                  width={width}
                >
                  {({ index, style }) => (
                    <Row
                      key={videoIds[index]}
                      id={videoIds[index]}
                      style={style}
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
