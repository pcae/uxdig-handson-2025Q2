'use client'
import { Button } from '@/shared/ui/button'
import { toast } from 'sonner'
import { ExampleToasterProps } from '../types'

// It is a example of a toaster component
// Please update the component to your needs

const ExampleToaster = ({ title, description, actionLabel }: ExampleToasterProps) => {
  const notify = () => {
    toast(title, {
      description,
      action: {
        label: actionLabel,
        onClick: () => console.log(actionLabel),
      },
    })
  }
  return (
    <>
      <Button onClick={notify}>Sonner</Button>
    </>
  )
}

export default ExampleToaster
