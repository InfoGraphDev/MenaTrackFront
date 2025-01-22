import React from 'react';
import styles from './style.module.scss'; 
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import TooltipComponent from '../../DataDisplay/Tooltip';
import SvgComponent from '../SVG';

interface FloatButtonComponentProps {
    DataUse: Array<{
      icon: string;
      title: string;
      value: any; 
    }>;
    handleOnClick: (value: any) => void; 
    shadow?:boolean,
    activeComponent?:any
  }
  
const FloatButtonComponent = ({ DataUse, handleOnClick,shadow=true,activeComponent }:FloatButtonComponentProps) => {
    const isArabicLanguage=useIsArabicLanguage();
  return (
    <div className={`${styles.containerFloatButton} ${shadow&&styles.shadow}`}>
      {DataUse?.map(({ icon, title, value }, i) => (
        <TooltipComponent style={{margin:"0rem .3rem"}} key={i} position={isArabicLanguage ? "right" : "left"} text={title}>
          <div key={i} className={`${styles.button} ${activeComponent===value&&styles.active}`} onClick={() => handleOnClick(value)} >
            <SvgComponent svgName={icon} className={styles.icon}/>
          </div>
        </TooltipComponent>
      ))}
    </div>
  );
};

export default FloatButtonComponent;
