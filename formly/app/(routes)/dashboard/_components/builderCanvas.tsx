import { cn } from '@/lib/utils'
import React from 'react'

const BuilderCanvas = () => {
  return (
    <div className='relative px-5  w-full h-[calc(100vh_-_64px)] 
    pt-4  overflow-auto transition-all duration-300 scrollbar'>
      {/* Droppable Canvas */}
      <div className={cn(`\
      w-full relative bg-transparent px-5 md:px-2 rounded-md flex flex-col
      min-h-[50vh] items-center justify-start pt-1 pb-14

      ring-4 ring-primary/20 ring-inset
        `)}>

      </div>
    </div>
  )
}

export default BuilderCanvas