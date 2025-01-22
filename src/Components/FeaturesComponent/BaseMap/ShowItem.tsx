import React from 'react'
import { useTranslation } from 'react-i18next';
import styles from "./style.module.scss";
import { useBasemapToggle } from '@/Utils/EsriUtils/useBasemapToggle';
import { ArchgisConstant } from '@/Core/Constant/Esri-Constant';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import LazyLoadImage from '@/Components/UIElements/DataDisplay/LazyImage';

function ShowItemBaseMap({TypeViewRef}) {
    const handleChangeType =useBasemapToggle();
    const {t}=useTranslation();
    const isArabicLanguage=useIsArabicLanguage();

  return (
    <FlexComponent gap='1rem' className={`${styles.containerTypeMap} ${styles.english}`} ref={TypeViewRef}>
        {ArchgisConstant.TypeBaseMap?.map(({image,title,type},i)=>(
            <button title={t(title)} key={i} type='button' className={styles.type} onClick={()=>{handleChangeType(type)}}>
                <LazyLoadImage alt={t(title)} src={image}/>
                <p className={styles.title}>{t(title)}</p>
            </button>
        ))}
    </FlexComponent>
)
}

export default ShowItemBaseMap

