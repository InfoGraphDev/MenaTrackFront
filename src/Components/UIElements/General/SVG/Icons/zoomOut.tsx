import React from 'react'

interface Type{
    className?:string
}
function ZoomOutSvg({className}:Type) {
  return (
    <svg className={className} width="1rem" height="1.5rem" viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M200 12C200 15.1826 198.736 18.2348 196.485 20.4853C194.235 22.7357 191.183 24 188 24H12C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12C0 8.8174 1.26428 5.76515 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0H188C191.183 0 194.235 1.26428 196.485 3.51472C198.736 5.76515 200 8.8174 200 12Z" fill="currentColor"/>
    </svg>
    )
}

export default ZoomOutSvg
