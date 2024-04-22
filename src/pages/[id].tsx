import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'
import { List, ListItem } from '@mui/material'

export default function Index() {
  const router = useRouter()
  const { id } = router.query
  const [user, loading, error] = useUser(id ? String(id) : '')

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <main>
      <List>
        {user && (
          <>
            <ListItem key="name">Name: {user.name}</ListItem>
            <ListItem key="username">Username: {user.username}</ListItem>
            <ListItem key="email">Email: {user.email}</ListItem>
            <ListItem key="street">Street: {user.address.street}</ListItem>
            <ListItem key="city">City: {user.address.city}</ListItem>
            <ListItem key="zipcode">Zipcode: {user.address.zipcode}</ListItem>
            <ListItem key="phone">Phone number: {user.phone}</ListItem>
          </>
        )}
      </List>
    </main>
  )
}
