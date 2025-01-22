import React from 'react'

interface Type{
    className?:string
}
function ResetPasswordSvg({className}:Type) {
  return (
    <svg className={className} width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 3C10.6131 3 8.32387 3.94821 6.63604 5.63604C4.94821 7.32387 4 9.61305 4 12H1L5 16L9 12H6C6 8.14 9.14 5 13 5C16.86 5 20 8.14 20 12C20 15.86 16.86 19 13 19C11.1 19 9.38 18.24 8.12 17.01L6.7 18.42C8.3801 20.0734 10.6428 21 13 21C15.3869 21 17.6761 20.0518 19.364 18.364C21.0518 16.6761 22 14.3869 22 12C22 9.61305 21.0518 7.32387 19.364 5.63604C17.6761 3.94821 15.3869 3 13 3ZM15 11V10C15 8.9 14.1 8 13 8C11.9 8 11 8.9 11 10V11C10.45 11 10 11.45 10 12V15C10 15.55 10.45 16 11 16H15C15.55 16 16 15.55 16 15V12C16 11.45 15.55 11 15 11ZM14 11H12V10C12 9.45 12.45 9 13 9C13.55 9 14 9.45 14 10V11Z" fill="currentColor"/>
    </svg>
    )
}

export default ResetPasswordSvg;


