import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'
import { List, ListItem } from '@mui/material'

export default function Index() {
  const router = useRouter()
  const { id } = router.query
  const [user, loading, error] = useUser(id! + '')

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <>
      <main>
        <List>
          <ListItem key={user?.id}>Name: {user?.name}</ListItem>
          <ListItem key={user?.id}>Username: {user?.username}</ListItem>
          <ListItem key={user?.id}>Email: {user?.email}</ListItem>
          <ListItem key={user?.id}>Street: {user?.address.street}</ListItem>
          <ListItem key={user?.id}>City: {user?.address.city}</ListItem>
          <ListItem key={user?.id}>Zipcode: {user?.address.zipcode}</ListItem>
          <ListItem key={user?.id}>Phone number: {user?.phone}</ListItem>
        </List>
      </main>
    </>
  )
}
