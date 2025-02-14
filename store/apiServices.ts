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
  console.log('getPlaylist: ', response.status);
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

export { getPlaylist, getSlug };
