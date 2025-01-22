import React from 'react';
import styles from "./style.module.scss";
import { useTranslation } from 'react-i18next';

type TitleProps = {
  text: string,
  type?: 'dash' | 'solid',
  look?:boolean,
  style?: React.CSSProperties; 

};

function DividerComponent({ text, type = 'dash',look,style }: TitleProps) {
  const { t } = useTranslation();
  const dividerClass = `${styles.divider} ${styles[type]}`;

  return (
    <div className={`${styles.title} ${look&&styles.look}`} style={style}>
        <div className={dividerClass}></div>
        <p className={styles.text}>{t(text)}</p>
        <div className={dividerClass}></div>
    </div>
  );
}

export default DividerComponent;
