import React from 'react'

interface Type{
    className?:string
}
function LineSvg({className}:Type) {
  return (
    <svg className={className} width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 17C5.10457 17 6 16.1046 6 15C6 13.8954 5.10457 13 4 13C2.89543 13 2 13.8954 2 15C2 16.1046 2.89543 17 4 17Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M19 8C17.8954 8 17 8.89543 17 10C17 11.1046 17.8954 12 19 12C20.1046 12 21 11.1046 21 10C21 8.89543 20.1046 8 19 8Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M18 10.9998L16.5 12.4998C15.483 13.5168 14.974 14.0258 14.363 14.1378C14.123 14.1828 13.877 14.1828 13.637 14.1378C13.026 14.0258 12.517 13.5178 11.5 12.4998C10.483 11.4828 9.974 10.9738 9.363 10.8618C9.12302 10.8176 8.87698 10.8176 8.637 10.8618C8.026 10.9738 7.517 11.4818 6.5 12.4998L5 13.9998" stroke="currentColor" strokeWidth="2"/>
    </svg>
    )
}

export default LineSvg
