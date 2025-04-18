import React from 'react'

const cubeLogo = (
    {text, outermost, styleText} : 
    {text: string,
    outermost?: string,
    styleText?: string
}) => {
    
  return (
<button className={`btn cube cube-hover ${outermost}`} type="button">
  <div className="bg-top">
    <div className="bg-inner"></div>
  </div>
  <div className="bg-right">
    <div className="bg-inner"></div>
  </div>
  <div className="bg">
    <div className="bg-inner"></div>
  </div>
  <div className={`text ${styleText}`}>{text}</div>
</button>
  )
}

export default cubeLogo