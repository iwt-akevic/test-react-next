import { useEffect, useReducer } from 'react'

export interface User {
  id: number
  name: string
  email: string
  username: string
  address: {
    street: string
    city: string
    zipcode: string
  }
  phone: string
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: User }
  | { type: 'FETCH_ERROR'; payload: Error }

type State = {
  user: User | null
  loading: boolean
  error: Error | null
}

const initialState: State = {
  user: null,
  loading: true,
  error: null,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, user: action.payload, error: null }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

const useUser = (id: string): [User | null, boolean, Error | null] => {
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

  return [state.user, state.loading, state.error]
}

export default useUser
