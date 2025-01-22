import React from 'react'
import HandelBackButton from './Utils-Button/handel-Back/HandelBackButton';
import HandelCloseButton from './Utils-Button/handel-Close/Handel-Close';
import { useTranslation } from 'react-i18next';
import styles from "./style.module.scss";
import FlexComponent from '../../Layout/Flex';

interface TitleComponent{
  title:string; 
  SpecialClose?:any,
  ShowBackButton?:any,
  withoutClose?:any
}
function TitleComponent({title,SpecialClose,ShowBackButton=true,withoutClose}:TitleComponent) {
  const {t}=useTranslation();
  
  return (
      <FlexComponent justifyContent='space-between' className={styles.header}>
          {ShowBackButton&&<HandelBackButton/>}
          <h1>{t(title)}</h1>
          {!withoutClose&&<HandelCloseButton SpecialClose={SpecialClose}/>}
          {withoutClose&&<span></span>}
      </FlexComponent>
  )
}

export default TitleComponent;
