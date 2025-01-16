export const FETCH_PLAYLIST_REQUEST = 'PlaylistPage/FETCH_PLAYLIST_REQUEST'
export const FETCH_PLAYLIST_SUCCESS = 'PlaylistPage/FETCH_PLAYLIST_SUCCESS'
export const FETCH_PLAYLIST_ERROR = 'PlaylistPage/FETCH_PLAYLIST_ERROR'

export const TOGGLE_VIDEO_COMPLETED = 'PlaylistPage/TOGGLE_VIDEO_COMPLETED'
export const TOGGLE_VIDEO_OPEN = 'PlaylistPage/TOGGLE_VIDEO_OPEN'
export const SET_VIDEO_FILTER = 'PlaylistPage/SET_VIDEO_FILTER'

export const fetchPlaylistRequest = payload => ({ type: FETCH_PLAYLIST_REQUEST, payload })
export const fetchPlaylistSuccess = payload => ({ type: FETCH_PLAYLIST_SUCCESS, payload })
export const fetchPlaylistError = payload => ({ type: FETCH_PLAYLIST_ERROR, payload })

export const toggleVideoCompleted = payload => ({ type: TOGGLE_VIDEO_COMPLETED, payload })
export const toggleVideoOpen = payload => ({ type: TOGGLE_VIDEO_OPEN, payload })
export const setVideoFilter = payload => ({ type: SET_VIDEO_FILTER, payload })
