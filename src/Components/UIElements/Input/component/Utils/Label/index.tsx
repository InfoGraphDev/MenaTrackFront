import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from "./style.module.scss";
import FlexComponent from '@/Components/UIElements/Layout/Flex';

function LabelFeildReactHookForm({label,required}) {
    const {t}=useTranslation();
  return (
    <div>
        {label&&
        <FlexComponent 
        justifyContent='flex-start' 
        gap='.2rem' className={styles.label}>
          <span>{t(label)}</span>
          {required&&<span className={styles.required}>*</span>}
        </FlexComponent>}
    </div>
  )
}

export default LabelFeildReactHookForm
