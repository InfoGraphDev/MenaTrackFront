import React, { useState } from 'react'
import DarkOverlay from './DarkOverlay';
import ButtonDarkMode from './Button';
import { useTheme } from '@/Context/ContextApi/ThemeProvider';
import { useBasemapToggle } from '@/Utils/EsriUtils/useBasemapToggle';
import { ThemeEnum } from '@/Core/Enums/ThemeEnum';

function DarkModeSwitch() {
    const [isOpen,setisOpen]=useState(false);
    const {theme,toggleTheme,isDarkMode}=useTheme();
    const handleChangeType = useBasemapToggle();
  
    const handelClick=()=>{
        toggleTheme();
        if (theme == ThemeEnum[0]) {
            handleChangeType("streets-night-vector");
          } else {
            handleChangeType("satellite");
          }
      
        setisOpen(true);
        setTimeout(() => {
            setisOpen(false)
        }, 2000);
        location.reload();
    }

  return (
    <>
        {isOpen?
            <DarkOverlay isOpen={isOpen} lightView={!isDarkMode}>
                <ButtonDarkMode lightView={isDarkMode} special={true}/>
            </DarkOverlay>:
        <div onClick={handelClick}><ButtonDarkMode lightView={!isDarkMode} special={false}/></div>}
    </>
  )
}

export default DarkModeSwitch
