import VideoFilter from './VideoFilter'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
import { videoFilterSelector } from '../../selectors'
import { setVideoFilter } from '../../actions'

const withFilterState = connect(
  state => ({
    videoFilter: videoFilterSelector(state),
  }),
  dispatch => ({
    setVideoFilter: filterValue => {
      dispatch(setVideoFilter(filterValue))
    },
  }),
)

const withFilters = withProps(({ setVideoFilter, videoFilter }) => {
  return {
    filters: [
      {
        onFilterSet: () => {
          setVideoFilter({ filterValue: 'all' })
        },
        name: 'All',
        active: videoFilter === 'all',
      },
      {
        onFilterSet: () => {
          setVideoFilter({ filterValue: 'completed' })
        },
        name: 'Completed',
        active: videoFilter === 'completed',
      },
      {
        onFilterSet: () => {
          setVideoFilter({ filterValue: 'not-completed' })
        },
        name: 'Not completed',
        active: videoFilter === 'not-completed',
      },
    ],
  }
})

export default  compose(
  withFilterState,
  withFilters,
)(VideoFilter)
