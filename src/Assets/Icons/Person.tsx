import React from 'react'

interface Type{
    className?:string
}
function PersonSvg({className}:Type) {
  return (
    <svg className={className} width="1.5rem" height="1.5rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 9.25C9.79493 9.25 11.25 7.79493 11.25 6C11.25 4.20507 9.79493 2.75 8 2.75C6.20507 2.75 4.75 4.20507 4.75 6C4.75 7.79493 6.20507 9.25 8 9.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.75 14.25C2.75 11.75 4.75 9.25 8 9.25C11.25 9.25 13.25 11.75 13.25 14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)
}

export default PersonSvg
