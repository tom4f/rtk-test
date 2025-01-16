import get from 'lodash/fp/get'

const videoFilterSelector = get('coursePage.filterValue')
const coursePageLoadingSelector = get('coursePage.loading')
const coursePageErrorSelector = get('coursePage.error')
const playlistVideosSelector = get('coursePage.playlistVideos')
const playlistTitleSelector = get('coursePage.title')

const isCompletedSelector = (state, id) => {
  const video = state.coursePage.playlistVideos.find(video => {
    return video.id === id
  })
  return video.completed || false
}

const isOpenSelector = (state, id) => {
  const video = state.coursePage.playlistVideos.find(video => {
    return video.id === id
  })
  return video.open || false
}

const getFilteredVideosSelector = state => {
  const filterValue = videoFilterSelector(state)
  const videos = playlistVideosSelector(state)
  switch (filterValue) {
    case 'completed':
      return videos.filter(video => {
        return video.completed
      })
    case 'not-completed':
      return videos.filter(video => {
        return !video.completed
      })
    default:
      return videos
  }
}

export {
  playlistVideosSelector,
  getFilteredVideosSelector,
  isCompletedSelector,
  isOpenSelector,
  videoFilterSelector,
  coursePageLoadingSelector,
  coursePageErrorSelector,
  playlistTitleSelector,
}
