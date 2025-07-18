'use client'

import ExampleToaster from './ExampleToaster'
import ExampleOptimistic from './ExampleOptimistic'
const ExampleComponent = () => {
  return (
    <>
      <div className='mr-10'>
        <h2 className='text-md font-bold'>ExampleToaster</h2>
        <ExampleToaster
          title='Title'
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
          actionLabel='Undo'
        />
      </div>
      <div className='mr-10'>
        <h2 className='text-md font-bold'>ExampleOptimistic</h2>
        <ExampleOptimistic />
      </div>
    </>
  )
}

export default ExampleComponent
