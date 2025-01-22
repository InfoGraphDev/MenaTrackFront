import React, { ReactNode } from 'react';
import styles from "./style.module.scss";
import { useTranslation } from 'react-i18next';
import FlexComponent from '../../Layout/Flex';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import LeftArrowSvg from '@/Assets/Icons/leftArrow';
import RightArrowSvg from '@/Assets/Icons/rightArrow';
import DownArrowSvg from '@/Assets/Icons/downarrow';

interface DropDownComponentProps {
  datause: { label: string; value: string }[];
  handelChange: (value: string) => void;
  active: string;
  position: 'left' | 'right' | 'middle';
  children: ReactNode;
  style?: React.CSSProperties; 
}

const DropDownComponent: React.FC<DropDownComponentProps> = ({
  datause,
  handelChange,
  active,
  position = "middle",
  children,
  style, 
}) => {
  const { i18n, t } = useTranslation();
  const isArabicLanguage = useIsArabicLanguage();

  return (
    <div className={styles.container} > 
      <FlexComponent gap='.2rem' className={styles.Icon}>
        <div>{children}</div>
        <div style={isArabicLanguage ? {marginLeft: "-.8rem"} : {marginRight: "-.8rem"}} className={styles.Expand}>
          <DownArrowSvg/>
        </div>
      </FlexComponent>
      <div className={`${styles.containerDropDown} ${styles[position]}`} style={style}>
        <div className={`${styles.dropdownContent}`}>
          {datause.map(({ label, value }, i) => (
            <div key={i}>
                <FlexComponent justifyContent='space-between' className={`${styles.Element} ${active === value ? styles.active : ''}`} onClick={() => handelChange(value)}>
                    <span>{t(label)}</span>
                    {i18n.language === "en" ?<RightArrowSvg/> : <LeftArrowSvg/>}
                </FlexComponent>
                {i !== datause.length - 1 && <div className={styles.break}></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDownComponent;
