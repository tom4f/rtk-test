'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { playlist } from '@/store/playlist/selectors';
import { useAppDispatch } from '@/store/hooks';
import { uploadVideo, resetUploadState } from '@/store/video/videoUploadSlice';

import { addVideoToPlaylist } from '@/store/courses';

import { videoUpload } from '@/store/video/videoUploadSelectors';

export const AddVideo = () => {
  const dispatch = useAppDispatch();
  const [videoId, setVideoId] = useState('');
  const [playlistId, setPlaylistId] = useState(0);
  const [videoData, setVideoData] = useState({});

  const { playlistIds } = useAppSelector(playlist);
  const { success, loading, error } = useAppSelector(videoUpload);

  useEffect(() => {
    if (success) {
      const playlistName = Object.keys(playlistIds).find(
        (key) => playlistIds[key] === playlistId
      );

      dispatch(
        addVideoToPlaylist({ playlistId: playlistName, video: videoData })
      );
      const timeout = setTimeout(() => {
        dispatch(resetUploadState());
        setVideoId('');
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [success, dispatch, playlistId, videoData, playlistIds]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const youtubeUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=AIzaSyDUUXZp0tzRc7IsZtKBX-xNYbRWUwLJC68`;
    const ytResponse = await fetch(youtubeUrl);
    const ytData = await ytResponse.json();

    const video = ytData.items?.[0];
    if (!video) {
      alert('Video not found');
      return;
    }

    const payload = {
      playlistId,
      video,
    };

    if (ytData.items && ytData.items.length > 0) {
      setVideoData(video);
      dispatch(uploadVideo(payload));
    } else {
      console.warn('No video found');
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
        onChange={(event) => setPlaylistId(+event.target.value)}
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
    </form>
  );
};
