import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllPlaylists } from '../apiServices';

type PlaylistState = {
  playlistIds: Record<string, number>;
  loading: boolean;
  error: string | null;
};

const initialState: PlaylistState = {
  playlistIds: {},
  loading: false,
  error: null,
};

export const fetchAllPlaylists = createAsyncThunk(
  'playlist/fetchAllPlaylists',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPlaylists();
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch`);
      }

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Record<string, number>>) => {
      state.playlistIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPlaylists.fulfilled, (state, action) => {
        state.playlistIds = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCourses } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;
