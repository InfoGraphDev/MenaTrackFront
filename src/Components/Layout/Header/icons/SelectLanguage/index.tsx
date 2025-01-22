import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LocalStorageEnum } from '@/Core/Enums/LocalStorage';
import DropDownComponent from '@/Components/UIElements/Navigation/DropDawn';
import useLocalStorageOptions from '@/Hooks/useLocalStorageOptions';
import LanguageSvg from '@/Assets/Icons/language';
import styles from "../style.module.scss";
import StylesTwo from "./style.module.scss";
import ButtonComponent from '@/Components/UIElements/General/Button';
import LanguageTwoSvg from '@/Assets/Icons/LanguageTwo';

const SelectLanguage: React.FC = () => {
  const { i18n } = useTranslation();
  const [ActiveValue,setActiveValue]=useState(i18n.language);
  const {setValueLocalStorage}=useLocalStorageOptions();
  
  const DataUse = [
    { label: 'header.Arabic', value: 'ar' },
    { label: 'header.English', value: 'en' }
  ];

  const handelChange = (language: string) => {
    setValueLocalStorage({key:LocalStorageEnum[0],value:language});
    location.reload();
    i18n.changeLanguage(language);
    setActiveValue(language);
    document.dir = language === 'ar' ? 'rtl' : 'ltr'; 
  };

  const handelClick=()=>{
    setValueLocalStorage({key:LocalStorageEnum[0],value:ActiveValue=="ar"?"en":"ar"});
    location.reload();
  }
  return (
    <div>
      <div className={StylesTwo.SelectLanguagePc}>
        <DropDownComponent position='middle' active={ActiveValue} datause={DataUse} handelChange={handelChange}>
          <LanguageSvg className={styles.svgstroke}/>
        </DropDownComponent>
      </div>
      <div className={StylesTwo.SelectLanguageMobile} >
        <ButtonComponent 
          PassingData={handelClick} 
          size='small'
          style={{gap:".8rem",padding:".3rem .8rem",height:"2.2rem",fontSize:".8rem"}}
          DataButton={2}
          text={ActiveValue=="ar"?"header.English":'header.Arabic'} />
      </div>
    </div>
  );
};

export default SelectLanguage;
