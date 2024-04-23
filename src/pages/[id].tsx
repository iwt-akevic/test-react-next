import { useRouter } from 'next/router'
import { List, ListItem } from '@mui/material'
import useUser from '@/hooks/useUser'

export default function Index() {
  const router = useRouter()
  const { id } = router.query
  const { data, loading, error } = useUser(id ? String(id) : '')

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <main>
      <List>
        {data && (
          <>
            <ListItem key="name">Name: {data.name}</ListItem>
            <ListItem key="username">Username: {data.username}</ListItem>
            <ListItem key="email">Email: {data.email}</ListItem>
            <ListItem key="street">Street: {data.address.street}</ListItem>
            <ListItem key="city">City: {data.address.city}</ListItem>
            <ListItem key="zipcode">Zipcode: {data.address.zipcode}</ListItem>
            <ListItem key="phone">Phone number: {data.phone}</ListItem>
          </>
        )}
      </List>
    </main>
  )
}
