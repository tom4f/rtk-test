'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { playlist } from '@/store/playlist/selectors';
import { useAppDispatch } from '@/store/hooks';
import { uploadVideo, resetUploadState } from '@/store/video/videoUploadSlice';
import { VideoJsonType } from '@/store/courses';
import { ChangeEvent } from 'react';
import { fetchPlaylist } from '@/store/courses';
import { playlistVideosSelector } from '@/store/courses';
import { useDeleteVideoMutation } from '@/store/apiServices';
//import { fetchPlaylist } from '@/store/courses';

import { addVideoToPlaylist } from '@/store/courses';

import { videoUpload } from '@/store/video/videoUploadSelectors';

const getPlaylistName = (
  playlistIds: Record<string, number>,
  playlistId: number
) => Object.keys(playlistIds).find((key) => playlistIds[key] === playlistId);

export const AddVideo = () => {
  const dispatch = useAppDispatch();
  const [videoId, setVideoId] = useState('');
  const [playlistId, setPlaylistId] = useState(0);
  const [videoData, setVideoData] = useState<VideoJsonType | null>(null);
  const [deleteVideo, { isLoading: isDeleting }] = useDeleteVideoMutation();

  const { playlistIds } = useAppSelector(playlist);
  const { success, loading, error } = useAppSelector(videoUpload);

  const playlistName = Object.keys(playlistIds).find(
    (key) => playlistIds[key] === playlistId
  );

  const videosInPlaylist = useAppSelector((state) => {
    return playlistName ? playlistVideosSelector(state, playlistName) : null;
  });

  useEffect(() => {
    if (success) {
      if (playlistName && videoData) {
        dispatch(
          addVideoToPlaylist({ playlistId: playlistName, video: videoData })
        );
      }
      // or refetch API call
      // if (playlistName) dispatch(fetchPlaylist(playlistName));

      const timeout = setTimeout(() => {
        dispatch(resetUploadState());
        setVideoId('');
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [success, dispatch, playlistId, videoData, playlistName]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const youtubeUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=AIzaSyDUUXZp0tzRc7IsZtKBX-xNYbRWUwLJC68`;
    const ytResponse = await fetch(youtubeUrl);
    const ytData = await ytResponse.json();

    const video = ytData.items?.[0] as VideoJsonType;
    if (!video) {
      alert('Video not found');
      return;
    }
    if (videosInPlaylist?.some((v) => v.id === videoId)) {
      alert('This video is already in the playlist');
      return;
    }

    const payload = {
      playlistId,
      video,
    };

    if (video) {
      setVideoData(video);
      dispatch(uploadVideo(payload));
    } else {
      console.warn('No video found');
    }
  };

  const onChangePlaylist = (event: ChangeEvent<HTMLSelectElement>) => {
    setPlaylistId(+event.target.value);
    const playlistName = getPlaylistName(playlistIds, +event.target.value);
    if (playlistName) {
      dispatch(fetchPlaylist(playlistName));
    }
  };

  const removeVideo = async (videoId: string) => {
    if (!playlistName) return;

    try {
      await deleteVideo({ playlistId, videoId }).unwrap();
      alert('Video deleted');
      // optionally refetch playlist:
      dispatch(fetchPlaylist(playlistName));
    } catch (err) {
      console.error('Failed to delete video', err);
      alert('Failed to delete');
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <label htmlFor='video-id'>Video ID</label>
      <br />
      <input
        id='video-id'
        name='video-id'
        value={videoId}
        onChange={(event) => setVideoId(event.target.value)}
      />
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
      <br />
      <br />
      <button type='submit'>Add video to playlist</button>
      {success && <>Success...</>}
      {error && <>Error...</>}
      {loading && <>Loading...</>}
      {isDeleting && <>Deleting...</>}

      {videosInPlaylist?.length && (
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
      )}
    </form>
  );
};
