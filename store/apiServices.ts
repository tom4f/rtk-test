const apiUrl = '/api';

const getPlaylist = async (playlistId: string) => {
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    //mode: 'no-cors',
    body: JSON.stringify({ id: playlistId }),
  };
  console.log(request);
  const response = await fetch(`${apiUrl}/playlist/index.php`, request);
  console.log(response);
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

export { getPlaylist, getSlug };
