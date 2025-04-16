import { createSelector } from 'reselect';
import { RootState } from '../store';

export const videoUpload = createSelector(
  (state: RootState) => state.videoUpload,
  ({ success, loading, error }) => ({ success, loading, error })
);
