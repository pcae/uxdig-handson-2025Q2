'use client'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

// It is a example of a toaster component
// Please update the component to your needs

interface ExampleToasterProps {
  title: string
  description?: string
  actionLabel: string
}

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
