import React from 'react'
import styles from "./style.module.scss";
import SearchPlaceButtonSvg from '@/Assets/Icons/SearchPlace';
import TooltipComponent from '@/Components/UIElements/DataDisplay/Tooltip';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import { useSetOpenSearchFeild } from '@/Context/Zustand';

function SearchButtonMobile() {
    const IsArabicLanguage=useIsArabicLanguage();
    const SetOpenSearchFeild=useSetOpenSearchFeild()

    const showandhidesearch=()=>{
      SetOpenSearchFeild(true)
    }

  return (
    <div style={IsArabicLanguage?{right:".5rem"}:{left:".5rem"}} className={styles.buttonSearch} onClick={showandhidesearch}>
      <TooltipComponent position={IsArabicLanguage?"left":"right"} style={{margin:"0rem 1.2rem"}} text='common.Search'  >
        <SearchPlaceButtonSvg />
      </TooltipComponent>
    </div>
  )
}

export default SearchButtonMobile
