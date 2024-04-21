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
      const fetchUser = async () => {
        try {
          const response= await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
          const data = await response.json() 
          setUser(data)
        } catch (error) {
          setError(error as Error)
        } finally {
          setLoading(false)
        }
      }
  
      fetchUser()
  
      // Cleanup function to cancel fetch if component unmounts or re-renders
      return () => {
        // Cleanup logic if needed
      }
    }, []) // Empty dependency array ensures effect runs only once
  
    return [user, loading, error]
  }

export default useUser
