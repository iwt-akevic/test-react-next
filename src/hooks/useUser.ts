import { UseUserState, UseUserReturnType, User } from '@/lib/types'
import { reducer } from '@/lib/userReducer'
import { useEffect, useReducer } from 'react'

const initialState: UseUserState = {
  data: null,
  loading: true,
  error: null,
}

const useUser = (id: string): UseUserReturnType => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: 'FETCH_START' })
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        const data = await response.json()
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error as Error })
      }
    }

    fetchUser()

    return () => {
    }
  }, [id])

  // not best option
  return { data: state.data as User, loading: state.loading, error: state.error }
}

export default useUser
