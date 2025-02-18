import React from 'react'

interface Type{
    className?:string
}
function DashboardSvg({className}:Type) {
  return (
    <svg className={className} width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3H11V11H3V3ZM13 3H21V11H13V3ZM3 13H11V21H3V13ZM18 13H16V16H13V18H16V21H18V18H21V16H18V13Z" fill="currentColor"/>
    </svg>

)
}

export default DashboardSvg
