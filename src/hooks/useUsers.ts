import { useEffect, useCallback, useReducer } from 'react'
import { UseUsersState, UseUsersReturnType, User } from '@/lib/types'
import { reducer } from '@/lib/userReducer'

const initialState: UseUsersState = {
  data: [],
  loading: true,
  error: null,
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

  // also not best practice
  return { data: state.data as User[], loading: state.loading, error: state.error, refetch }
}

export default useUsers
