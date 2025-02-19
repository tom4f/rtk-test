import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiUrl = '/api';

const getPlaylist = async (playlistId: string) => {
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
  const response = await fetch(`${apiUrl}/slug/index.php`, request);
  return response;
};

const getAllPlaylists = async () => {
  const url = `${apiUrl}/slug/index.php`;
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

// Define the API slice
export const playlistApi = createApi({
  reducerPath: 'playlistApi', // A unique name for the slice
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/slug/index.php` }), // Define base URL for your API
  endpoints: (builder) => ({
    // Define the "getAllPlaylists" endpoint
    getAllPlaylists: builder.query<any, void>({
      query: () => 'playlists', // The API endpoint for fetching playlists
    }),
    // Add other API endpoints here as needed
  }),
});

export { getPlaylist, getSlug, getAllPlaylists };

export const { useGetAllPlaylistsQuery } = playlistApi; // Hook for using the query
