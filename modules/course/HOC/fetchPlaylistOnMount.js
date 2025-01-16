import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { fetchPlaylistRequest } from '../actions'

const withFetchPlaylistRequest = connect(
  null,
  (dispatch, { playlistId }) => {
    if (!playlistId) {
      throw Error('Missing playlist id in props')
    }
    return {
      fetchPlaylistRequest: () => {
        dispatch(fetchPlaylistRequest({playlistId}))
      },
    }
  },
)

const fetchPlaylistOnMount = lifecycle({
  componentDidMount() {
    this.props.fetchPlaylistRequest()
  },
})

export default compose(
  withFetchPlaylistRequest,
  fetchPlaylistOnMount,
)
