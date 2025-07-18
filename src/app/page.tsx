import Header from '@/shared/components/layouts/Header'
import { ExampleComponent, ExampleAsyncActions } from '@/modules/example'
import { Suspense } from 'react'

const Page = () => {
  return (
    <>
      <Header />
      <div className='container mx-auto flex gap-2 py-10'>
        <ExampleComponent />
        <div className='mr-10'>
          <h2 className='text-md text-foreground font-bold'>ExampleAsyncActions</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <ExampleAsyncActions />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Page
