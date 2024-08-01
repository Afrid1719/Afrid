import AddTodo from '@/components/AddTodo'
import { Unauthorized } from '@/components/Unauthorized'
import { getServerSession } from 'next-auth'

export default async function Page() {
  const userId = await getServerSession()
  console.log('session', userId)

  return !!userId ? <AddTodo /> : <Unauthorized />
}

