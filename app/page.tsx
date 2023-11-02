import AddTodo from '@/components/AddTodo'
import React from 'react'
import { Unauthorized } from '@/components/Unauthorized'

// Typing Component is not encouraged but looks stylish
const Page: React.FunctionComponent = () => {
  const userId = true

  return !!userId ? <AddTodo /> : <Unauthorized />
}

export default Page
