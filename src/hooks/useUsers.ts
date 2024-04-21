import { useState, useEffect } from 'react';

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

const useUsers = (initialData: User[] = []): { users: User[], loading: boolean, error: Error | null } => {
  const [users, setUsers] = useState<User[]>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchUsers();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  return { users, loading, error };
};

export default useUsers;
