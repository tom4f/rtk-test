// src/features/videoUpload/videoUploadSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VideoJsonType } from '../courses';
import { RootState, AppDispatch } from '../store';

type UploadState = {
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: UploadState = {
  loading: false,
  error: null,
  success: false,
};

type UploadVideoRequest = { video: VideoJsonType; playlistId: number };

type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
};

export const uploadVideo = createAsyncThunk<
  void, // return type
  UploadVideoRequest,
  AsyncThunkConfig
>(
  'videoUpload/uploadVideo',
  async ({ video, playlistId }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/playlist/save-video.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video, id: playlistId }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload video');
      }

      return;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const videoUploadSlice = createSlice({
  name: 'videoUpload',
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadVideo.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const { resetUploadState } = videoUploadSlice.actions;
export const videoUploadReducer = videoUploadSlice.reducer;

export const videoUploadSelectors = {
  loading: (state: RootState) => state.videoUpload.loading,
  success: (state: RootState) => state.videoUpload.success,
  error: (state: RootState) => state.videoUpload.error,
};
