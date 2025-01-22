import React, { useEffect, useState } from 'react'
import styles from "./style.module.scss";
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import MoonSvg from '@/Assets/Icons/moon';
import SunSvg from '@/Assets/Icons/sun';

function ButtonDarkMode({special,lightView}) {
    const [checkValue,setCheckkValue]=useState(lightView);
    
    useEffect(()=>{
        setCheckkValue(!checkValue)
    },[lightView]);
    const handelChange=()=>{}
  
  return (
    <FlexComponent className={styles.container}>
        <input type="checkbox" checked={checkValue} onChange={handelChange}/> 
        <span className={`${styles.moon} ${special&&styles.larg}`}>{special?<MoonSvg height='7rem' width='7rem'/>:<MoonSvg/>}</span>
        <span className={`${styles.sun} ${special&&styles.larg}`}>{special?<SunSvg height='7rem' width='7rem'/>:<SunSvg/>}</span>
        <span className={`${styles.toggel} ${special&&styles.larg}`}></span>    
    </FlexComponent>
  )
}

export default ButtonDarkMode
