import { PayloadAction } from '@reduxjs/toolkit';
import { PlaylistState, VideoJsonType } from './slice';

export const reducers = {
  addVideoToPlaylist: (
    state: { [key: string]: PlaylistState },
    action: PayloadAction<{ playlistId: string; video: VideoJsonType }>
  ) => {
    const { playlistId, video } = action.payload;
    const playlist = state[playlistId];
    if (playlist && Array.isArray(playlist.playlistVideos)) {
      playlist.playlistVideos.push({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnails: {
          default: { url: video.snippet.thumbnails.default.url },
        },
        completed: false,
        open: false,
      });
    }
  },

  removeCourse: (
    state: { [key: string]: PlaylistState },
    action: PayloadAction<{ slug: string }>
  ) => {
    delete state[action.payload.slug];
  },

  toggleVideoCompleted: (
    state: { [key: string]: PlaylistState },
    action: PayloadAction<{ slug: string; id: string }>
  ) => {
    const { slug, id } = action.payload;
    if (state[slug]) {
      state[slug].playlistVideos = state[slug].playlistVideos.map((video) =>
        video.id === id ? { ...video, completed: !video.completed } : video
      );
    }
  },

  toggleVideoOpen: (
    state: { [key: string]: PlaylistState },
    action: PayloadAction<{ slug: string; id: string }>
  ) => {
    const { slug, id } = action.payload;
    if (state[slug]) {
      state[slug].playlistVideos = state[slug].playlistVideos.map((video) =>
        video.id === id ? { ...video, open: !video.open } : video
      );
    }
  },

  setVideoFilter: (
    state: { [key: string]: PlaylistState },
    action: PayloadAction<{
      slug: string;
      filterValue: PlaylistState['filterValue'];
    }>
  ) => {
    const { slug, filterValue } = action.payload;
    if (state[slug]) {
      state[slug].filterValue = filterValue;
    }
  },

  markVideoCompleted: (
    state: { [key: string]: PlaylistState },
    action: PayloadAction<string>
  ) => {
    for (const course of Object.values(state)) {
      const video = course.playlistVideos.find((v) => v.id === action.payload);
      if (video) {
        video.completed = true;
        break;
      }
    }
  },
};
