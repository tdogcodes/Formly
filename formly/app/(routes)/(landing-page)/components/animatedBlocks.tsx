import React from 'react'
import BlockButtonElement from '@/components/blockButtonElement'
import { FormBlocks } from '@/lib/formBlocks'

const fieldBlocks = Object.values(FormBlocks).filter(
  (block) => block.blockCategory === 'Field'
)

const RadioBlock = fieldBlocks.find((block) => block.blockType === 'RadioSelect')
const TextFieldBlock = fieldBlocks.find((block) => block.blockType === 'TextField')
const TextAreaBlock = fieldBlocks.find((block) => block.blockType === 'TextArea')
const StarRatingBlock = fieldBlocks.find((block) => block.blockType === 'StarRating')
const ParagraphBlock = fieldBlocks.find((block) => block.blockType === 'Paragraph')
const HeadingBlock = fieldBlocks.find((block) => block.blockType === 'Heading')

export const RadioBlockComponent = (
  {className}
  :
  {className: string}) => (
  <div className={className}>
    <BlockButtonElement
      formBlock={RadioBlock as any}
      disabled={false}
      className="!cursor-default hover:shadow-[5px_5px_rgba(170,_120,_255,_0.4),_10px_10px_rgba(170,_120,_255,_0.3),_15px_15px_rgba(170,_120,_255,_0.2),_20px_20px_rgba(170,_120,_255,_0.1),_25px_25px_rgba(170,_120,_255,_0.05)] transition-all duration-300"
    />
  </div>
)

export const TextFieldBlockComponent = (
  {className}
  :
  {className: string}) => (
  <div className={className}>
    <BlockButtonElement
      formBlock={TextFieldBlock as any}
      disabled={false}
       className="!cursor-default hover:shadow-[5px_5px_rgba(170,_120,_255,_0.4),_10px_10px_rgba(170,_120,_255,_0.3),_15px_15px_rgba(170,_120,_255,_0.2),_20px_20px_rgba(170,_120,_255,_0.1),_25px_25px_rgba(170,_120,_255,_0.05)] transition-all duration-300"
    />
  </div>
)

export const TextAreaBlockComponent = (
  {className}
  :
  {className: string}
) => (
  <div className={className}>
    <BlockButtonElement
      formBlock={TextAreaBlock as any}
      disabled={false}
       className="!cursor-default hover:shadow-[5px_5px_rgba(170,_120,_255,_0.4),_10px_10px_rgba(170,_120,_255,_0.3),_15px_15px_rgba(170,_120,_255,_0.2),_20px_20px_rgba(170,_120,_255,_0.1),_25px_25px_rgba(170,_120,_255,_0.05)] transition-all duration-300"
    />
  </div>
)

export const StarRatingBlockComponent = (
  {className}
  :
  {className: string}
) => (
  <div className={className}>
    <BlockButtonElement
      formBlock={StarRatingBlock as any}
      disabled={false}
       className="!cursor-default hover:shadow-[5px_5px_rgba(170,_120,_255,_0.4),_10px_10px_rgba(170,_120,_255,_0.3),_15px_15px_rgba(170,_120,_255,_0.2),_20px_20px_rgba(170,_120,_255,_0.1),_25px_25px_rgba(170,_120,_255,_0.05)] transition-all duration-300"
    />
  </div>
)

export const ParagraphBlockComponent = (
  {className}
  :
  {className: string}
) => (
  <div className={className}>
    <BlockButtonElement
      formBlock={ParagraphBlock as any}
      disabled={false}
       className="!cursor-default hover:shadow-[5px_5px_rgba(170,_120,_255,_0.4),_10px_10px_rgba(170,_120,_255,_0.3),_15px_15px_rgba(170,_120,_255,_0.2),_20px_20px_rgba(170,_120,_255,_0.1),_25px_25px_rgba(170,_120,_255,_0.05)] transition-all duration-300"
    />
  </div>
)

export const HeadingBlockComponent = (
  {className}
  :
  {className: string}) => (
  <div className={className}>
    <BlockButtonElement
      formBlock={HeadingBlock as any}
      disabled={false}
       className="!cursor-default hover:shadow-[5px_5px_rgba(170,_120,_255,_0.4),_10px_10px_rgba(170,_120,_255,_0.3),_15px_15px_rgba(170,_120,_255,_0.2),_20px_20px_rgba(170,_120,_255,_0.1),_25px_25px_rgba(170,_120,_255,_0.05)] transition-all duration-300"
    />
  </div>
)

