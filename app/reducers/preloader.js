import {IMAGES_PRELOAD} from '../actions'

const initialState = {
  done: false,
  progress: 0,
  loading: false
}

function preloaderReducer(state = initialState, action) {
  if (action.type === IMAGES_PRELOAD) {
    return action.status === 1 ? {done: false, progress: 0, loading: true}
      : action.status === 2 ? {...state, progress: action.progress}
      : {...state, done: true, progress: 1, loading: false}
  }
  return state
}

export default preloaderReducer
