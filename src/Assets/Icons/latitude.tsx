import React from 'react'

interface Type{
    className?:string
}
function LatitudeSvg({className}:Type) {
  return (
    <svg className={className} width="1.3rem" height="1.3rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_3518_2)">
        <path d="M4.85907 19C5.78892 19.951 6.89965 20.7064 8.12587 21.2216C9.35209 21.7368 10.669 22.0015 11.9991 22C13.3295 22.0018 14.6468 21.7372 15.8734 21.222C17.0999 20.7068 18.211 19.9513 19.1411 19H4.85907ZM3.33807 17C2.62812 15.7738 2.18862 14.41 2.04907 13H21.9511C21.8115 14.41 21.372 15.7738 20.6621 17H3.33807ZM21.9511 11H2.04907C2.18862 9.59002 2.62812 8.22618 3.33807 7.00001H20.6621C21.372 8.2262 21.8115 9.59003 21.9511 11ZM12.0001 2.00001C10.6698 1.99838 9.35274 2.26297 8.12633 2.7782C6.89993 3.29342 5.78903 4.04886 4.85907 5.00001H19.1401C18.2102 4.04898 17.0995 3.29361 15.8733 2.77839C14.6471 2.26317 13.3301 1.99852 12.0001 2.00001Z" fill="currentColor"/>
        </g>
        <defs>
        <clipPath id="clip0_3518_2">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
    </svg>
)
}

export default LatitudeSvg

