import {
  FETCH_PLAYLIST_REQUEST,
  FETCH_PLAYLIST_ERROR,
  FETCH_PLAYLIST_SUCCESS,
  TOGGLE_VIDEO_COMPLETED,
  TOGGLE_VIDEO_OPEN,
  SET_VIDEO_FILTER,
} from './actions'

export const initialState = {
  loading: false,
  error: false,
  playlistVideos: [],
  title: '',
  filterValue: 'all',
}

function playlistReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PLAYLIST_REQUEST:
      return { ...state, loading: true, error: false }
    case FETCH_PLAYLIST_SUCCESS:
      const { playlistVideos, title } = action.payload
      return {
        ...state,
        loading: false,
        error: false,
        playlistVideos,
        title,
      }
    case FETCH_PLAYLIST_ERROR:
      return { ...state, loading: false, error: true }
    case TOGGLE_VIDEO_COMPLETED: {
      const { id } = action.payload
      return {
        ...state,
        playlistVideos: state.playlistVideos.map(video => {
          if (video.id === id) {
            return { ...video, completed: !video.completed }
          }
          return {...video} // intentional error
        }),
      }
    }
    case TOGGLE_VIDEO_OPEN: {
      const { id } = action.payload
      return {
        ...state,
        playlistVideos: state.playlistVideos.map(video => {
          if (video.id === id) {
            return { ...video, open: !video.open }
          }
          return {...video} // intentional error
        }),
      }
    }
    case SET_VIDEO_FILTER:
      const { filterValue } = action.payload
      return { ...state, filterValue }
    default:
      return state
  }
}

export default playlistReducer
