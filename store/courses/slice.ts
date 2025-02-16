import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPlaylist } from '../apiServices';
import { RootState } from '../store';

export type VideoType = {
  id: string;
  completed: boolean;
  open: boolean;
  title: string;
  thumbnails: {
    default: {
      url: string;
    };
  };
  description: string;
};

export type PlaylistState = {
  title: string;
  playlistVideos: VideoType[];
  loading: boolean;
  error: string | null;
  filterValue: 'all' | 'completed' | 'not-completed';
};

const initialState: { [key: string]: PlaylistState } = {};

export const fetchPlaylist = createAsyncThunk(
  'PlaylistPage/fetchPlaylist',
  async (slug: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const playlistId = state.playlist.playlistIds[slug];
    if (!playlistId) return rejectWithValue('Playlist ID not found');

    const response = await getPlaylist(playlistId);
    if (!response.ok) return rejectWithValue('Failed to fetch playlist');

    const { playlist, playlistVideos } = await response.json();
    return {
      slug,
      title: playlist.localized.title,
      playlistVideos: playlistVideos.map((video: VideoType) => ({
        id: video.id,
        title: video.title,
        description: video.description,
        thumbnails: { default: { url: video.thumbnails.default.url } },
        completed: false,
        open: false,
      })),
    };
  }
);

const coursesSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    removeCourse: (state, action: PayloadAction<{ slug: string }>) => {
      delete state[action.payload.slug];
    },
    toggleVideoCompleted: (
      state,
      action: PayloadAction<{ slug: string; id: string }>
    ) => {
      const { slug, id } = action.payload;
      if (state[slug]) {
        state[slug].playlistVideos = state[slug].playlistVideos.map((video) =>
          video.id === id ? { ...video, completed: !video.completed } : video
        );
      }
    },
    toggleVideoOpen: (
      state,
      action: PayloadAction<{ slug: string; id: string }>
    ) => {
      const { slug, id } = action.payload;
      if (state[slug]) {
        state[slug].playlistVideos = state[slug].playlistVideos.map((video) =>
          video.id === id ? { ...video, open: !video.open } : video
        );
      }
    },
    setVideoFilter: (
      state,
      action: PayloadAction<{
        slug: string;
        filterValue: PlaylistState['filterValue'];
      }>
    ) => {
      const { slug, filterValue } = action.payload;
      if (state[slug]) {
        state[slug].filterValue = filterValue;
      }
    },
    markVideoCompleted: (state, action: PayloadAction<string>) => {
      for (const course of Object.values(state)) {
        const video = course.playlistVideos.find(
          (v) => v.id === action.payload
        );
        if (video) {
          video.completed = true;
          break;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylist.pending, (state, action) => {
        const slug = action.meta.arg;
        if (!state[slug]) {
          state[slug] = {
            playlistVideos: [],
            title: '',
            loading: true,
            error: null,
            filterValue: 'all',
          };
        } else {
          state[slug].loading = true;
        }
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        const { slug, playlistVideos, title } = action.payload;
        state[slug] = {
          playlistVideos,
          title,
          loading: false,
          error: null,
          filterValue: 'all',
        };
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        const slug = action.meta.arg;
        if (state[slug]) {
          state[slug].loading = false;
          state[slug].error = action.payload as string;
        }
      });
  },
});

export const {
  toggleVideoCompleted,
  toggleVideoOpen,
  setVideoFilter,
  removeCourse,
  markVideoCompleted,
} = coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;
