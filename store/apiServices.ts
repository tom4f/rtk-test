import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { VideoJsonType } from './courses';
import { FetchPlaylistResponse, FetchPlaylistJsonResponse } from './courses';
import { RootState } from './store';
const apiUrl = '/api';

const getPlaylist = async (playlistId: number) => {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: playlistId }),
  };
  const response = await fetch(`${apiUrl}/playlist/index.php`, request);
  return response;
};

const getAllPlaylists = async () => {
  const url = `${apiUrl}/slug`;
  console.log(url);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 10 },
  });

  return response;
};

export { getPlaylist, getAllPlaylists };

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const delayedBaseQuery: BaseQueryFn<any, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  await delay(2000); // ⏳ wait 2s
  const rawBaseQuery = fetchBaseQuery({ baseUrl: apiUrl });
  return rawBaseQuery(args, api, extraOptions);
};

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  baseQuery: delayedBaseQuery,
  tagTypes: ['Playlists'],
  endpoints: (builder) => ({
    getAllPlaylists: builder.query<{ [key: string]: number }, void>({
      query: () => 'slug/index.php',
      providesTags: ['Playlists'],
    }),
    createPlaylist: builder.mutation<void, { playlistName: string }>({
      query: ({ playlistName }) => ({
        url: `slug/create.php`,
        method: 'POST',
        body: { playlistName },
      }),
      invalidatesTags: ['Playlists'],
    }),
    deletePlaylist: builder.mutation<void, { playlistId: number }>({
      query: ({ playlistId }) => ({
        url: `slug/delete.php`,
        method: 'POST',
        body: { playlistId },
      }),
      invalidatesTags: ['Playlists'],
    }),
  }),
});

export const {
  useGetAllPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
} = playlistsApi;

export const videoApi = createApi({
  reducerPath: 'videoApi',
  baseQuery: delayedBaseQuery,
  endpoints: (builder) => ({
    deleteVideo: builder.mutation<
      void,
      { playlistId: number; videoId: string }
    >({
      query: ({ playlistId, videoId }) => ({
        url: `playlist/delete-video.php`,
        method: 'POST',
        body: { playlistId, videoId },
      }),
    }),
    addVideo: builder.mutation<
      void,
      { playlistId: number; video: VideoJsonType }
    >({
      query: ({ playlistId, video }) => ({
        url: `playlist/save-video.php`,
        method: 'POST',
        body: { playlistId, video },
      }),
    }),
  }),
});

export const { useDeleteVideoMutation, useAddVideoMutation } = videoApi;

// playlistApi.ts
export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // or custom fetchFn if needed
  endpoints: (builder) => ({
    getPlaylist: builder.query<FetchPlaylistResponse, string>({
      async queryFn(slug, _api) {
        const state = _api.getState() as RootState;
        const playlistId = state.playlist.playlistIds[slug];
        if (!playlistId)
          return { error: { status: 404, data: 'Playlist ID not found' } };

        const response = await getPlaylist(playlistId);
        if (!response.ok)
          return { error: { status: 500, data: 'Failed to fetch playlist' } };

        const json = (await response.json()) as FetchPlaylistJsonResponse;
        return {
          data: {
            slug,
            title: json.playlist.title,
            playlistVideos: json.playlistVideos.map((video: VideoJsonType) => ({
              id: video.id,
              title: video.snippet.title,
              description: video.snippet.description,
              thumbnails: {
                default: { url: video.snippet.thumbnails.default.url },
              },
              completed: false,
              open: false,
            })),
          },
        };
      },
    }),
  }),
});

export const { useGetPlaylistQuery, useLazyGetPlaylistQuery } = playlistApi;
