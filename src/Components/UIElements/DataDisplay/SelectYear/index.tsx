import React from 'react'
import styles from "./style.module.scss";
import ReusableInput from '../../Input';
import FlexComponent from '../../Layout/Flex';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import { useTranslation } from 'react-i18next';
import RightArrowSvg from '@/Assets/Icons/rightArrow';
import LeftArrowSvg from '@/Assets/Icons/leftArrow';

interface SelectSpecificYear{
    formOptions:any
    Datause:any,
    Title:string
}

function SelectSpecificYear({Datause,formOptions,Title}:SelectSpecificYear) {
   const IsArabic=useIsArabicLanguage();
   const {t}=useTranslation();
    const IncreaseValue=()=>{
      let Number=formOptions?.watch()[Datause?.name]>0?formOptions?.watch()[Datause?.name]:0
      ++Number
      formOptions?.setValue(Datause?.name, Number, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
  }

    const handelDecrease=()=>{
      if(formOptions?.watch()[Datause?.name]>0){
        let Number=formOptions?.watch()[Datause?.name]>0?formOptions?.watch()[Datause?.name]:0
        --Number
        formOptions?.setValue(Datause?.name, Number, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });  
      }
    }
  return (
    <div className={styles.container}>
        <div className={styles.title}>{Title&&<div>{t(Title)}</div>}</div>
        <FlexComponent gap='1.5rem' justifyContent='space-between'>
            <div className={`${styles.icon} ${styles.active}`} onClick={IncreaseValue}>
              {IsArabic?<RightArrowSvg/> :<LeftArrowSvg/>}
            </div>
            <div style={{width:"60%"}}>
                <ReusableInput  textAlignCenter={true} Datause={Datause} formOptions={formOptions}/>
            </div>
            <div onClick={handelDecrease} className={`${styles.icon} ${Number(formOptions?.watch()[Datause?.name])>0&&styles.active}`}>
              {IsArabic?<LeftArrowSvg/>:<RightArrowSvg/>}
            </div>
        </FlexComponent>
    </div>
  )
}

export default SelectSpecificYear
