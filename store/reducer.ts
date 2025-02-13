import {
  FETCH_PLAYLIST_REQUEST,
  FETCH_PLAYLIST_ERROR,
  FETCH_PLAYLIST_SUCCESS,
  TOGGLE_VIDEO_COMPLETED,
  TOGGLE_VIDEO_OPEN,
  SET_VIDEO_FILTER,
} from './actions';

export type RootState = {
  loading: boolean;
  error: boolean;
  playlistVideos: Video[];
  title: string;
  filterValue: string;
};

export const initialState = {
  loading: false,
  error: false,
  playlistVideos: [],
  title: '',
  filterValue: 'all',
};

interface FetchPlaylistRequestAction {
  type: typeof FETCH_PLAYLIST_REQUEST;
}

interface FetchPlaylistSuccessAction {
  type: typeof FETCH_PLAYLIST_SUCCESS;
  payload: {
    playlistVideos: Video[];
    title: string;
  };
}

interface FetchPlaylistErrorAction {
  type: typeof FETCH_PLAYLIST_ERROR;
}

interface ToggleVideoCompletedAction {
  type: typeof TOGGLE_VIDEO_COMPLETED;
  payload: {
    id: string;
  };
}

interface ToggleVideoOpenAction {
  type: typeof TOGGLE_VIDEO_OPEN;
  payload: {
    id: string;
  };
}

interface SetVideoFilterAction {
  type: typeof SET_VIDEO_FILTER;
  payload: {
    filterValue: string;
  };
}

type PlaylistAction =
  | FetchPlaylistRequestAction
  | FetchPlaylistSuccessAction
  | FetchPlaylistErrorAction
  | ToggleVideoCompletedAction
  | ToggleVideoOpenAction
  | SetVideoFilterAction;

interface Video {
  id: string;
  completed: boolean;
  open: boolean;
}

function playlistReducer(
  state: RootState = initialState,
  action: PlaylistAction
): RootState {
  switch (action.type) {
    case FETCH_PLAYLIST_REQUEST:
      return { ...state, loading: true, error: false };
    case FETCH_PLAYLIST_SUCCESS:
      const { playlistVideos, title } = action.payload;
      return {
        ...state,
        loading: false,
        error: false,
        playlistVideos,
        title,
      };
    case FETCH_PLAYLIST_ERROR:
      return { ...state, loading: false, error: true };
    case TOGGLE_VIDEO_COMPLETED: {
      const { id } = action.payload;
      return {
        ...state,
        playlistVideos: state.playlistVideos.map((video) => {
          if (video.id === id) {
            return { ...video, completed: !video.completed };
          }
          return { ...video };
        }),
      };
    }
    case TOGGLE_VIDEO_OPEN: {
      const { id } = action.payload;
      return {
        ...state,
        playlistVideos: state.playlistVideos.map((video) => {
          if (video.id === id) {
            return { ...video, open: !video.open };
          }
          return { ...video };
        }),
      };
    }
    case SET_VIDEO_FILTER:
      const { filterValue } = action.payload;
      return { ...state, filterValue };
    default:
      return state;
  }
}

export default playlistReducer;
