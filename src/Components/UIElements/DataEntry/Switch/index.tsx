import React from 'react';
import styles from "./style.module.scss";
import { useTranslation } from 'react-i18next';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import FlexComponent from '../../Layout/Flex';

interface SwitchInterface{
    HandelClick:any,
    title:string,
    isActive:boolean
}

function SwitchComponent({ HandelClick,title,isActive }:SwitchInterface) {
    const { t } = useTranslation();
    const isArabicLanguage=useIsArabicLanguage();

    return (
            <FlexComponent justifyContent='flex-start' gap='.5rem' className={styles.container} onClick={HandelClick}>
                <div className={`${styles['toggleSwitch']} 
                    ${isActive&&styles['on-color']}`} >
                    <span className={`${isActive ? styles.sliderOn : styles.sliderOff} ${isArabicLanguage?styles.arabic:styles.english}`}></span>
                </div>
                <div className={styles.title}>{t(title)}</div>
            </FlexComponent>
    );
}

export default SwitchComponent;
