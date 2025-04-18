import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { VideoJsonType } from './courses';
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

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
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

export const {
  useGetAllPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
} = playlistApi;
export const { useDeleteVideoMutation, useAddVideoMutation } = videoApi;
