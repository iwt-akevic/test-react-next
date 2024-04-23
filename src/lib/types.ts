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

export type UseUsersReturnType = {
  data: User[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

export type UseUserReturnType = {
  data: User | null
  loading: boolean
  error: Error | null
}
  
export type Action =
| { type: 'FETCH_START' }
| { type: 'FETCH_SUCCESS'; payload: User[] }
| { type: 'FETCH_ERROR'; payload: Error }

// same as UserUsersReturnType so I can prolly delete one of them
export type UseUsersState = {
  data: User[]
  loading: boolean
  error: Error | null
}

// same as UserUserReturnType so I can prolly delete one of them
export type UseUserState = {
  data: User | null
  loading: boolean
  error: Error | null
}

export type UserReducerState =
  | UseUsersState
  | UseUserState