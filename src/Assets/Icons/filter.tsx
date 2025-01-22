import React from 'react'

interface Type{
    className?:string
}
function FilterSvg({className}:Type) {
  return (
    <svg className={className} width="1rem" height="1rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 4.5H15M3.5 8H12.5M6.5 11.5H9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    )
}

export default FilterSvg
