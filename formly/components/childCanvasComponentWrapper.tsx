import React from 'react'
import { FormBlockInstance } from '@/@types/formBlock.type'
import { FormBlocks } from '@/lib/formBlocks'

const ChildCanvasComponentWrapper = ({ 
    block,
} : {
    block: FormBlockInstance 
}) => {

    const CanvasComponent = FormBlocks[block.blockType]?.canvasComponent
    if(!CanvasComponent) return null;

  return (
    <CanvasComponent blockInstance={block} />
  )
}

export default ChildCanvasComponentWrapper