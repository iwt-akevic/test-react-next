import Router, { useRouter } from 'next/router'
import { List, ListItem } from '@mui/material'
import useUser from '@/hooks/useUser'
import { useEffect } from 'react'

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

// how to access query param from server
// export async function getServerSideProps() {
  // const router = Router.query
  // console.log(router)
  // const response = await fetch('https://jsonplaceholder.typicode.com/users')
  // const usersData: User[] = await response.json()

  // return {
  //   props: { usersData }
  // }
// }