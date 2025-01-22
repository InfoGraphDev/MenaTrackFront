import React from 'react'

interface Type{
    className?:string
}
function  PermissionSvg({className}:Type) {
  return (
    <svg className={className} width="1.5rem" height="1.5rem" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 10H6C4.89543 10 4 10.8954 4 12V38C4 39.1046 4.89543 40 6 40H42C43.1046 40 44 39.1046 44 38V35.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 23H18" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M10 31H34" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M34 22C37.3137 22 40 19.3137 40 16C40 12.6863 37.3137 10 34 10C30.6863 10 28 12.6863 28 16C28 19.3137 30.6863 22 34 22Z" fill="#2F88FF" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M44 28.4187C42.0468 24.6023 37.9999 22 33.9999 22C29.9999 22 28.0071 23.1329 25.9502 25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)
}

export default PermissionSvg
