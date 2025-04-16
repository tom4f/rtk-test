import { createSelector } from 'reselect';
import { RootState } from '../store';

export const playlist = createSelector(
  (state: RootState) => state.playlist,
  ({ playlistIds, loading, error }) => ({ playlistIds, loading, error })
);
