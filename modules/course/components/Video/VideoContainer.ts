import Video from './Video'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { isCompletedSelector, isOpenSelector } from '../../selectors'
import { toggleVideoCompleted, toggleVideoOpen } from '../../actions'

const withCompleted = connect(
  (state, { id }) => ({
    isCompleted: isCompletedSelector(state, id),
  }),
  (dispatch, { id, toggleOpenCallback, index }) => ({
    toggleCompleted: () => {
      dispatch(toggleVideoCompleted({ id }))
      toggleOpenCallback(index)
    },
  }),
)

const withOpen = connect(
  (state, { id }) => ({
    isOpen: isOpenSelector(state, id),
  }),
  (dispatch, { id, toggleOpenCallback, index }) => ({
    toggleOpen: () => {
      dispatch(toggleVideoOpen({ id }))
      toggleOpenCallback(index)
    },
  }),
)

export default compose(
  withCompleted,
  withOpen,
)(Video)
