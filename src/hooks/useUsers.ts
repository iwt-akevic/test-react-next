import { useEffect, useCallback, useReducer } from 'react'
import { User } from './useUser'

type UseUsersReturnType = {
  users: User[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

type State = {
  users: User[]
  loading: boolean
  error: Error | null
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: User[] }
  | { type: 'FETCH_ERROR'; payload: Error }

const initialState: State = {
  users: [],
  loading: true,
  error: null,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload, error: null }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

const useUsers = (): UseUsersReturnType => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchUsers = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      dispatch({ type: 'FETCH_SUCCESS', payload: data })
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error as Error })
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const refetch = () => {
    fetchUsers()
  }

  return { users: state.users, loading: state.loading, error: state.error, refetch }
}

export default useUsers