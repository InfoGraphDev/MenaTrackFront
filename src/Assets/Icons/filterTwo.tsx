import React from 'react'

interface Type{
    className?:string
}
function FilterTwoSvg({className}:Type) {
  return (
    <svg className={className} width="1.4rem" height="1.4rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 4H19L14 10.5V20L10 16V10.5L5 4Z" fill="black" fillOpacity="0.3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    )
}

export default FilterTwoSvg
