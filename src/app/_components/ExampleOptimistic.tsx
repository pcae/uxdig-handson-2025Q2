'use client'
import { Button } from '@/components/ui/button'
import { addUserNames } from '../_actions/hello'
import { useActionState, useOptimistic } from 'react'

const userNames = ['John Doe', 'Jane Doe', 'John Smith', 'Jane Smith']

const ExampleOptimistic = () => {
  const [data, getName, pending] = useActionState(() => {
    const randomIndex = Math.floor(Math.random() * userNames.length)
    addOptimistic({ name: userNames[randomIndex] })
    return addUserNames({ name: userNames[randomIndex] })
  }, null)
  const [displayState, addOptimistic] = useOptimistic(data, (current, newName) => [
    ...(current ?? []),
    newName as { name: string },
  ])

  return (
    <div>
      <form action={getName}>
        <Button disabled={pending}>{!pending ? 'Click me' : 'Loading...'}</Button>
      </form>
      <ul>{displayState?.map((item, index) => <li key={index}>{item.name}</li>)}</ul>
    </div>
  )
}
export default ExampleOptimistic
