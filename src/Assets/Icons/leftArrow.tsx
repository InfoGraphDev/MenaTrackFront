import React from 'react'

interface Type{
    className?:string
}
function LeftArrowSvg({className}:Type) {
  return (
    <svg className={className} width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 18L9.5 12L15.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    )
}

export default LeftArrowSvg
