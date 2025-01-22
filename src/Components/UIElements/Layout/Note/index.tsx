import React from 'react'
import styles from "./style.module.scss";
import { useTranslation } from 'react-i18next';
import FlexComponent from '../Flex';
import InfoIconSvg from '@/Assets/Icons/info-icon';
import { useSetOpenSearchFeild } from '@/Context/Zustand';

interface note{
    text:string;
    ShowSearch?:boolean
}
function NoteComponent({text,ShowSearch}:note) {
    const { t } = useTranslation();
    const SetOpenSearchFeild=useSetOpenSearchFeild();
    const handelClick=()=>{
        SetOpenSearchFeild(true)
    }

  return (
        <div className={styles.note}>
            <div className={styles.item}>
                <span className={styles.icon}><InfoIconSvg/></span>
                <FlexComponent gap='.2rem'>
                        <span>{t(text)}</span>
                        {ShowSearch&&
                        <span className={styles.clickhere} 
                            onClick={handelClick}>{t("common.Clickhere")}
                        </span>}
                </FlexComponent>
            </div>
        </div>
)
}

export default NoteComponent
