import { useState, useEffect, useCallback } from 'react';
import { User } from './useUser';

type UseUsersReturnType = {
  users: User[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
};

const useUsers = (initialData: User[] = []): UseUsersReturnType => {
  const [users, setUsers] = useState<User[]>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setError(null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const refetch = () => {
    fetchUsers();
  };

  return { users, loading, error, refetch };
};

export default useUsers;
