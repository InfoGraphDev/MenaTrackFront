import FlexComponent from '@/Components/UIElements/Layout/Flex';
import { useLongitudeAndLatitude } from '@/Context/Zustand'
import React from 'react'
import styles from "./style.module.scss";
import { useTranslation } from 'react-i18next';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';

function ShowLangAndLatComponent() {
    const LongitudeAndLatitude=useLongitudeAndLatitude();
    const {latitude,longitude}=LongitudeAndLatitude;
    const {t}=useTranslation();
    const IsArabicLang=useIsArabicLanguage();

  return (
    <FlexComponent alignItems='normal' flexDirection='column' className={styles.container} style={{left:".8rem"}}>
        <FlexComponent className={styles.item} gap='.3rem' justifyContent='space-between'>
            <span>{t("common.longitude")}</span>
            <span className={styles.value}>{longitude.toFixed(5)}</span>
        </FlexComponent>
        <FlexComponent gap='.3rem' justifyContent='space-between'>
            <span>{t("common.latitude")} </span>
            <span className={styles.value}>{latitude.toFixed(5)}</span>
        </FlexComponent>
    </FlexComponent>
  )
}

export default ShowLangAndLatComponent
