import { Action, UserReducerState } from './types'

export const reducer = (state: UserReducerState, action: Action): UserReducerState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: null }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}