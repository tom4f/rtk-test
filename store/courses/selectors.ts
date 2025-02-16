import { createSelector } from 'reselect';
import { RootState } from '../store';

export const isOpenMapSelector = createSelector(
  [
    (state: RootState, slug: string) =>
      state.coursePage[slug]?.playlistVideos || [],
  ],
  (videos) =>
    videos.reduce((acc, video) => {
      acc[video.id] = video.open;
      return acc;
    }, {} as Record<string, boolean>)
);

export const coursesSelector = createSelector(
  (state: RootState) => state.coursePage,
  (coursePage) => Object.keys(coursePage)
);

const courseDataSelector = (state: RootState, slug: string) =>
  state.coursePage[slug];

const coursePageLoadingSelector = (state: RootState, slug: string) =>
  state.coursePage[slug]?.loading || false;
const coursePageErrorSelector = (state: RootState, slug: string) =>
  state.coursePage[slug]?.error || null;

const playlistVideosSelector = (state: RootState, slug: string) =>
  state.coursePage[slug]?.playlistVideos || [];

const isCompletedSelector = (
  state: RootState,
  slug: string,
  id: string
): boolean => {
  const video = state.coursePage[slug]?.playlistVideos.find(
    (video) => video.id === id
  );
  return video?.completed || false;
};

const isOpenSelector = (
  state: RootState,
  slug: string,
  id: string
): boolean => {
  const video = state.coursePage[slug]?.playlistVideos.find(
    (video) => video.id === id
  );
  return video?.open || false;
};

const videoFilterSelector = (state: RootState, slug: string) =>
  state.coursePage[slug]?.filterValue;
const playlistTitleSelector = (state: RootState, slug: string) =>
  state.coursePage[slug]?.title || '';

const getFilteredVideosSelector = (slug: string) =>
  createSelector(
    [
      (state: RootState) => videoFilterSelector(state, slug),
      (state: RootState) => playlistVideosSelector(state, slug),
    ],
    (filterValue, videos = []) => {
      switch (filterValue) {
        case 'completed':
          return videos.filter((video) => video.completed);
        case 'not-completed':
          return videos.filter((video) => !video.completed);
        default:
          return videos;
      }
    }
  );

export {
  playlistVideosSelector,
  getFilteredVideosSelector,
  isCompletedSelector,
  isOpenSelector,
  videoFilterSelector,
  coursePageLoadingSelector,
  coursePageErrorSelector,
  playlistTitleSelector,
  courseDataSelector,
};
