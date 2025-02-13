import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlaylist } from './apiServices';

export const fetchPlaylist = createAsyncThunk(
  'playlist/fetchPlaylist',
  async (playlistId: string, { rejectWithValue }) => {
    try {
      const response = await getPlaylist(playlistId);
      if (!response.ok) throw new Error('Failed to fetch playlist');
      const { playlist, playlistVideos } = await response.json();
      return {
        title: playlist.localized.title,
        playlistVideos: playlistVideos.map(
          (video: {
            id: string;
            title: string;
            thumbnail: string;
            description: string;
            open: boolean;
          }) => ({
            id: video.id,
            title: video.title,
            thumbnail: video.thumbnail,
            description: video.description,
          })
        ),
      };
    } catch (error) {
      return rejectWithValue('error?.message');
    }
  }
);

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    playlist: { title: '', playlistVideos: [] },
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlaylist.fulfilled, (state, action) => {
        console.log(state);
        state.loading = false;
        state.playlist = action.payload;
      })
      .addCase(fetchPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default playlistSlice.reducer;
