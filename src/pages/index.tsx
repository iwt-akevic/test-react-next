import { User } from '@/hooks/useUser'
import useUsers from '@/hooks/useUsers'
import { Button, List, ListItem } from '@mui/material'
import Link from 'next/link'

export default function Index(usersData: User[]) {
  const { users, loading, error } = useUsers(usersData)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {'error.message'}</div>
  }

  return (
    <div className='main'>
      <h1>User List</h1>
      <div className='wrapper'>
        {users.map((user: User) => (
            <List key={user.id}>
                <>
                <ListItem>Name: {user.name}</ListItem>
                <ListItem>Email: {user.email}</ListItem>
                <Button variant="contained"><Link href={`/${user.id}`}>View Details</Link></Button>
                </>
            </List>
          ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const usersData = await response.json();

  return {
    props: { usersData },
  };
}
