import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPlaylist } from './apiServices';

export const playlistIds = {
  java: 'PLYPjPMiw3_YsVockWfuuhoP86YPDUXp4f',
  'free-code-camp': 'UU8butISFwT-Wl7EV0hUK0BQ',
  'ten-days-of-javascript': 'PLpcSpRrAaOaoIqHQddZOdbRrzr5dJtgSs',
  'fk-2024-e': 'PLnXfazh66kVfUsfw9Oh5rBttZHaJe6HKB',
  'fk-2024-p': 'PLnXfazh66kVd0jXpYliCLAreHc4TDwnTf',
  'fk-2024-f': 'PLnXfazh66kVc8TRx1qmK3wshWs330_xsK',
};

export type SlugType = keyof typeof playlistIds;

export interface VideoType {
  id: string;
  completed: boolean;
  open: boolean;
  title: string;
  thumbnails: {
    medium: {
      url: string;
    };
  };
  description: string;
}

export interface PlaylistState {
  title: string;
  playlistVideos: VideoType[];
  loading: boolean;
  error: string | null;
  filterValue: 'all' | 'completed' | 'not-completed';
}

const initialState: { [key: string]: PlaylistState } = {};

export const fetchPlaylist = createAsyncThunk(
  'PlaylistPage/fetchPlaylist',
  async (slug: SlugType) => {
    const response = await getPlaylist(playlistIds[slug]);
    const { playlist, playlistVideos } = await response.json();
    return {
      slug,
      title: playlist.localized.title,
      playlistVideos: playlistVideos.map((video: VideoType) => ({
        id: video.id,
        title: video.title,
        thumbnail: video.thumbnails.medium.url,
        description: video.description,
        completed: false,
        open: false,
      })),
    };
  }
);

const playlistSlice = createSlice({
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
          state[slug].error = action.error.message || 'Error fetching playlist';
        }
      });
  },
});

export const {
  toggleVideoCompleted,
  toggleVideoOpen,
  setVideoFilter,
  removeCourse,
} = playlistSlice.actions;

export default playlistSlice.reducer;
