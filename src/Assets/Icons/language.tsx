import React from 'react'

interface Type{
    className?:string
}
function LanguageSvg({className}:Type) {
  return (
    <svg className={className} width="1.4rem" height="1.4rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_3408_44)">
        <path stroke='currentColor' d="M12 23C18.075 23 23 18.075 23 12C23 5.925 18.075 1 12 1M12 23C5.925 23 1 18.075 1 12C1 5.925 5.925 1 12 1M12 23C15 23 16 18 16 12C16 6 15 1 12 1M12 23C9 23 8 18 8 12C8 6 9 1 12 1M2 16H22M2 8H22"  strokeWidth="2"/>
        </g>
        <defs>
        <clipPath id="clip0_3408_44">
        <rect width="2rem" height="2rem"/>
        </clipPath>
        </defs>
    </svg>
    )
}

export default LanguageSvg
