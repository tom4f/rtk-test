import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlaylist } from '../apiServices';
import { RootState, AppDispatch } from '../store';
import { reducers } from './reducers';

export type VideoJsonType = {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
};

export type FetchPlaylistJsonResponse = {
  playlist: {
    title: string;
    id: number;
  };
  playlistVideos: VideoJsonType[];
};

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

export type FetchPlaylistResponse = {
  slug: string;
  title: string;
  playlistVideos: VideoType[];
};

type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
};

const initialState: { [key: string]: PlaylistState } = {};

// createAsyncThunk<ReturnedType, ArgumentType, ThunkAPIType>
export const fetchPlaylist = createAsyncThunk<
  FetchPlaylistResponse,
  string,
  AsyncThunkConfig
>('PlaylistPage/fetchPlaylist', async (slug, { getState, rejectWithValue }) => {
  const state = getState() as RootState;
  const playlistId = state.playlist.playlistIds[slug];
  if (!playlistId) return rejectWithValue('Playlist ID not found');

  const response = await getPlaylist(playlistId);
  if (!response.ok) return rejectWithValue('Failed to fetch playlist');

  const { playlist, playlistVideos } =
    (await response.json()) as FetchPlaylistJsonResponse;
  return {
    slug,
    title: playlist.title,
    playlistVideos: playlistVideos.map((video: VideoJsonType) => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnails: {
        default: { url: video.snippet.thumbnails.default.url },
      },
      completed: false,
      open: false,
    })),
  };
});

const coursesSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers,
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
  addVideoToPlaylist,
  toggleVideoCompleted,
  toggleVideoOpen,
  setVideoFilter,
  removeCourse,
  markVideoCompleted,
} = coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;
