import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  getFilteredVideosSelector,
  coursePageLoadingSelector,
  coursePageErrorSelector,
  playlistTitleSelector,
} from '../selectors'

const withPlaylistData = connect(
  createStructuredSelector({
    playlistVideos: getFilteredVideosSelector,
    loading: coursePageLoadingSelector,
    error: coursePageErrorSelector,
    title: playlistTitleSelector,
  }),
)

export default withPlaylistData
