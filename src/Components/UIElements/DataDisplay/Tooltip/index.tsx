import React from 'react';
import styles from "./style.module.scss";
import { useTranslation } from 'react-i18next';

const getPositionStyle = (position) => {
  switch (position) {
    case 'top':
      return styles.topTooltip;
    case 'right':
      return styles.rightTooltip;
    case 'bottom':
      return styles.bottomTooltip;
    case 'left':
      return styles.leftTooltip;
    default:
      return null;
  }
};
interface TooltipProps {
    text: string;
    position: 'left' | 'right' | 'top' | 'bottom';
    style?: React.CSSProperties; 
    children?: React.ReactNode;
    active?:boolean
}
const TooltipComponent = ({ text, position = 'top', style = {}, children,active=true }:TooltipProps) => {
  const positionStyle = getPositionStyle(position);
  const {t}=useTranslation()

  return (
    <div className={styles.tooltipContainer} >
      {children}
      <div className={`${styles.tooltip} ${positionStyle}`}
           style={{ ...style, visibility: active ? 'visible' : 'hidden' }} >
        <span>{t(text)}</span>
      </div>
    </div>
  );
};

export default TooltipComponent;
