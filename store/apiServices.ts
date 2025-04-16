import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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

const getSlug = async (id: string) => {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  };
  const response = await fetch(`${apiUrl}/slug`, request);
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

export { getPlaylist, getSlug, getAllPlaylists };

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getAllPlaylists: builder.query<
      { playlists: Array<{ id: number; name: string }> },
      void
    >({
      query: () => 'slug/index.php',
    }),
  }),
});

export const removeVideoApi = createApi({
  reducerPath: 'removeVideoApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
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
  }),
});

export const { useGetAllPlaylistsQuery } = playlistApi;
export const { useDeleteVideoMutation } = removeVideoApi;
