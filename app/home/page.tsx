import AddTodo from '@/components/AddTodo'
import React from 'react'
import { Unauthorized } from '@/components/Unauthorized'
import { getServerSession } from 'next-auth'

// Typing Component is not encouraged but looks stylish
const Page: React.FunctionComponent = async () => {
  const userId = await getServerSession()
  console.log('session', userId)

  return !!userId ? <AddTodo /> : <Unauthorized />
}

export default Page
