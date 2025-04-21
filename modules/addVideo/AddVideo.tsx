'use client';

import { useState, FormEvent, useEffect } from 'react';
//import { useAppSelector } from '@/store/hooks';
// import { playlist } from '@/store/playlist/selectors';
import { useAppDispatch } from '@/store/hooks';
// import { uploadVideo, resetUploadState } from '@/store/video/videoUploadSlice';
import { VideoJsonType } from '@/store/courses';
import { ChangeEvent } from 'react';
// import { fetchPlaylist } from '@/store/courses';
//import { playlistVideosSelector } from '@/store/courses';
import {
  useDeleteVideoMutation,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useGetAllPlaylistsQuery,
  useAddVideoMutation,
  useLazyGetPlaylistQuery,
} from '@/store/apiServices';

import { extractYouTubeId } from './extractYouTubeId';

import { addVideoToPlaylist } from '@/store/courses';

// import { videoUpload } from '@/store/video/videoUploadSelectors';

const getPlaylistName = (
  playlistIds: Record<string, number>,
  playlistId: number
) => Object.keys(playlistIds).find((key) => playlistIds[key] === playlistId);

export const AddVideo = () => {
  const dispatch = useAppDispatch();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [videoId, setVideoId] = useState('');
  const [playlistId, setPlaylistId] = useState(0);
  const [videoData, setVideoData] = useState<VideoJsonType | null>(null);

  const [
    addVideo,
    {
      isLoading: isAddingVideo,
      isError: isAddingVideoError,
      isSuccess: isAddingVideoSuccess,
    },
  ] = useAddVideoMutation();
  const [
    deleteVideo,
    {
      isLoading: isDeletingVideo,
      isError: isDeletingVideoError,
      isSuccess: isDeletingVideoSuccess,
    },
  ] = useDeleteVideoMutation();
  const [
    createPlaylist,
    {
      isLoading: isCreatingPlaylist,
      isError: isCreatingPlaylistError,
      isSuccess: isCreatingPlaylistSuccess,
    },
  ] = useCreatePlaylistMutation();
  const [
    deletePlaylist,
    {
      isLoading: isDeletingPlaylist,
      isError: isDeletingPlaylistError,
      isSuccess: isDeletingPlaylistSuccess,
    },
  ] = useDeletePlaylistMutation();

  // const { playlistIds } = useAppSelector(playlist);
  const {
    data,
    isSuccess: isGetPlaylistSuccess,
    isError: isGetPlaylistError,
    isLoading: isGetPlaylistLoading,
  } = useGetAllPlaylistsQuery();

  const playlistIds = data || {};

  // const { success, loading, error } = useAppSelector(videoUpload);

  const playlistName = Object.keys(playlistIds).find(
    (key) => playlistIds[key] === playlistId
  );

  /*   const videosInPlaylist = useAppSelector((state) => {
    return playlistName ? playlistVideosSelector(state, playlistName) : null;
  }); */

  const [trigger, { data: selectedPlaylist }] = useLazyGetPlaylistQuery();

  const videosInPlaylist = selectedPlaylist
    ? selectedPlaylist?.playlistVideos
    : [];

  useEffect(() => {
    if (isAddingVideoSuccess) {
      if (playlistName && videoData) {
        dispatch(
          addVideoToPlaylist({ playlistId: playlistName, video: videoData })
        );
      }
      // or refetch API call
      // if (playlistName) dispatch(fetchPlaylist(playlistName));

      const timeout = setTimeout(() => {
        // dispatch(resetUploadState());
        setVideoId('');
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isAddingVideoSuccess, dispatch, playlistId, videoData, playlistName]);

  const onAddVideo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const youTubeId = extractYouTubeId(videoId);

    if (!youTubeId) {
      alert('Video ID not found');
      return;
    }

    setVideoId(youTubeId);

    const youtubeUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${youTubeId}&key=AIzaSyDUUXZp0tzRc7IsZtKBX-xNYbRWUwLJC68`;
    const ytResponse = await fetch(youtubeUrl);
    const ytData = await ytResponse.json();

    const video = ytData.items?.[0] as VideoJsonType;
    if (!video) {
      alert('Video not found');
      return;
    }
    if (videosInPlaylist?.some((v) => v.id === youTubeId)) {
      alert('This video is already in the playlist');
      return;
    }

    const payload = {
      playlistId,
      video,
    };

    if (video) {
      setVideoData(video);
      // dispatch(uploadVideo(payload));
      addVideo(payload);
    } else {
      console.warn('No video found');
    }
  };

  const onChangePlaylist = (event: ChangeEvent<HTMLSelectElement>) => {
    setPlaylistId(+event.target.value);
    const playlistName = getPlaylistName(playlistIds, +event.target.value);
    if (playlistName) {
      // dispatch(fetchPlaylist(playlistName));
      trigger(playlistName);
    }
  };

  const removeVideo = async (videoId: string) => {
    if (!playlistName) return;

    try {
      await deleteVideo({ playlistId, videoId }).unwrap();
      // dispatch(fetchPlaylist(playlistName));
      trigger(playlistName);
    } catch (err) {
      console.error('Failed to delete video', err);
      alert('Failed to delete');
    }
  };

  const onCreatePlaylist = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPlaylist({ playlistName: newPlaylistName });
  };

  const onDeletePlaylist = () => {
    deletePlaylist({ playlistId });
  };

  if (isGetPlaylistError) {
    return <>Playlists loading error...</>;
  }

  return (
    <>
      {isGetPlaylistSuccess && <>Playlists loading success...</>}
      {isGetPlaylistLoading && <>loading playlists...</>}
      <form onSubmit={(e) => onAddVideo(e)}>
        <label htmlFor='video-id'>Video ID</label>
        <br />
        <input
          id='video-id'
          name='video-id'
          value={videoId || ''}
          onChange={(event) => setVideoId(event.target.value)}
        />
        <br />
        <br />
        <button type='submit' name=''>
          Add video to playlist
        </button>
        <br />
        <br />
        <label htmlFor='playlist'>Choose a playlist:</label>
        <br />
        <select
          required
          name='playlist'
          id='playlist'
          value={playlistId}
          onChange={(event) => onChangePlaylist(event)}
        >
          <option key={0} value=''>
            vyber
          </option>
          {Object.entries(playlistIds).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>

        {isAddingVideo && <>adding video...</>}
        {isAddingVideoError && <>adding video error...</>}
        {isAddingVideoSuccess && <>video added...</>}
        <br />
        <br />

        {videosInPlaylist?.length ? (
          <>
            <ul>
              {videosInPlaylist?.map((video) => (
                <li key={video.id}>
                  {video.title}
                  <button type='button' onClick={() => removeVideo(video.id)}>
                    remove video
                  </button>
                </li>
              ))}
            </ul>
            {isDeletingVideoError && <>Video deletion error...</>}
            {isDeletingVideo && <>Deleting video...</>}
          </>
        ) : (
          <>{isDeletingVideoSuccess && <>Video deleted...</>}</>
        )}
        <br />
      </form>
      <br />
      <br />
      <form onSubmit={onCreatePlaylist}>
        <label htmlFor='playlist-name'>New Playlist</label>
        <br />
        <input
          id='playlist-name'
          name='playlist-name'
          value={newPlaylistName}
          onChange={(event) => setNewPlaylistName(event.target.value)}
        />
        <br />
        <button type='submit'>Create new playlist</button>
        <br />
        {isCreatingPlaylist && <>Creating playlist...</>}
        {isCreatingPlaylistSuccess && <>Playlist created...</>}
        {isCreatingPlaylistError && <>Playlist creation error...</>}
      </form>
      <br />
      <br />
      <button type='button' onClick={onDeletePlaylist}>
        Remove playlist
      </button>
      <br />
      {isDeletingPlaylist && <>Deleting playlist...</>}
      {isDeletingPlaylistSuccess && <>Playlist deleted...</>}
      {isDeletingPlaylistError && <>Playlist deletion error...</>}
    </>
  );
};
