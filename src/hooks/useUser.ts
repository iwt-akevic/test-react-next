import { useState, useEffect } from 'react'
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

const useUser = (id: string): [User | null, boolean, Error | null] => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)
  
    useEffect(() => {
      let isMounted = true

      const fetchUser = async () => {
        try {
          const response= await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
          const data = await response.json()
          if (isMounted) {
            setUser(data)
          }
        } catch (error) {
          if (isMounted) {
            setError(error as Error)
          }
        } finally {
          if (isMounted) {
            setLoading(false)
          }
        }
      }
  
      fetchUser()

      return () => {
        isMounted = false
      }
    }, [id]) // Dependency array includes `id` to re-run effect when `id` changes
  
    return [user, loading, error]
  }

export default useUser
