import get from 'lodash/fp/get';
import { createSelector } from 'reselect';

const videoFilterSelector = get('coursePage.filterValue');
const coursePageLoadingSelector = get('coursePage.loading');
const coursePageErrorSelector = get('coursePage.error');
const playlistVideosSelector = get('coursePage.playlist.playlistVideos');
const playlistTitleSelector = get('coursePage.playlist.title');

interface Video {
  id: string;
  completed: boolean;
  open: boolean;
}

interface CoursePageState {
  filterValue: string;
  loading: boolean;
  error: string | null;
  playlistVideos: Video[];
  title: string;
}

export interface State {
  coursePage: CoursePageState;
}

const isCompletedSelector = (state: State, id: string): boolean => {
  if (!state.coursePage.playlistVideos) return false;
  const video = state.coursePage.playlistVideos.find((video: Video) => {
    return video.id === id;
  });
  return video?.completed || false;
};

const isOpenSelector = (state: State, id: string): boolean => {
  if (!state.coursePage.playlistVideos) return false;
  const video = state.coursePage.playlistVideos.find((video: Video) => {
    return video.id === id;
  });
  return video?.open || false;
};

const getFilteredVideosSelector = createSelector(
  [videoFilterSelector, playlistVideosSelector],
  (filterValue, videos = []) => {
    switch (filterValue) {
      case 'completed':
        return videos.filter((video: Video) => video.completed);
      case 'not-completed':
        return videos.filter((video: Video) => !video.completed);
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
};
