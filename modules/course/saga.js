import { put, takeLatest } from 'redux-saga/effects'
import { fetchPlaylistError, fetchPlaylistSuccess, FETCH_PLAYLIST_REQUEST } from './actions'
import ApiService from '@/services/ApiService'

export function* fetchPlaylistSaga(action) {
  try {
    const { playlistId } = action.payload
    const api = new ApiService()
    const response = yield api.getPlaylist(playlistId)
    const { playlist, playlistVideos } = yield response.json()
    yield put(fetchPlaylistSuccess({ title: playlist.localized.title, playlistVideos: playlistVideos.map(video => ({ id: video.id, title: video.title, thumbnail: video.thumbnails.medium.url, description: video.description, })) }))
  } catch (err) {
    console.error(err)
    yield put(fetchPlaylistError(err))
  }
}

export default function* playlistData() {
  yield takeLatest(FETCH_PLAYLIST_REQUEST, fetchPlaylistSaga)
}
