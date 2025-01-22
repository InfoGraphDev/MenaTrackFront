import React from 'react'

interface Type{
    className?:string
}
function ZoomInSvg({className}:Type) {
  return (
    <svg className={className} width="1.5rem" height="1.5rem" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17H10V12H5V10H10V5H12V10H17V12H12V17Z" fill="currentColor"/>
    </svg>
    )
}

export default ZoomInSvg
