import React from 'react';
import styles from "./style.module.scss";
import { useTranslation } from 'react-i18next';
import FlexComponent from '../../Layout/Flex';
import SvgComponent from '../../General/SVG';

interface ToggelButton{
    setSelectOne?:any,
    SelectOne:any,
    DataUse:any,
    handelChange?:any,
}

function TabsComponent({setSelectOne,SelectOne,DataUse,handelChange}:ToggelButton) {
    const { t } = useTranslation();
    const handelClick=({value})=>{setSelectOne(value)};

  return (
    <div className={styles.container}>
        <div className={styles.ContainerSelectOne}>
            {DataUse?.map(({title,value,icon},i)=>(
                <div key={i}  onClick={()=>{handelChange?handelChange({value:value}):handelClick({value:value})}} 
                    className={`${SelectOne===value&&styles.Active} ${styles.selectOne} 
                    ${i===0&&styles.first} ${value===DataUse.length-1&&styles.last}`}>
                        <FlexComponent gap='.5rem'>
                            {icon&&<div className={`${styles.icon} ${SelectOne===i&&styles.Active}`}>{icon&&icon}</div>}
                            <div className={styles.text}>{t(title)}</div>
                        </FlexComponent>
                </div>
            ))}
        </div>
    </div>
  )
}

export default TabsComponent;
