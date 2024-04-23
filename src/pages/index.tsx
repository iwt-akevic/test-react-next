import useUsers from '@/hooks/useUsers'
import { User } from '@/lib/types'
import { Button, List, ListItem } from '@mui/material'
import Link from 'next/link'

export default function Index({ usersData }: { usersData: User[] }) {
  const { data, loading, error } = useUsers()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const userList = data || usersData // Use usersData if users is not available

  return (
    <div className='main'>
      <h1>User List</h1>
      <div className='wrapper'>
        <List>
          {userList.map((user: User) => (
            <ListItem key={user.id}>
              <div>
                <div>Name: {user.name}</div>
                <div>Email: {user.email}</div>
              </div>
              <Button variant='contained'>
                <Link href={`/${user.id}`}>View Details</Link>
              </Button>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const usersData: User[] = await response.json()

  return {
    props: { usersData }
  }
}
