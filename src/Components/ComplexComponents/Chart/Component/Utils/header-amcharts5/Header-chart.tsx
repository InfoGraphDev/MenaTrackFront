import React, { useRef, FC } from 'react';
import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { ExportExcel } from '@/Utils/exportExcel';

interface HeaderChartCustomProps {
  data: { [key: string]: any }[];
  title: string;
  exportingRef: React.RefObject<any>;
  direction?:boolean,
  top15?:boolean
}

const HeaderAmchart5: FC<HeaderChartCustomProps> = ({ data, title, exportingRef,direction,top15=false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {t}=useTranslation();

  const downloadPNGBase64 = async () => {
    if (exportingRef.current) {
      const base64 = await exportingRef.current.export("png");
      const link = document.createElement("a");
      link.href = base64;
      link.download = "chart.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadCSV = () => {
    ExportExcel({data})
  };

  return (
    <div className={styles.container} ref={containerRef} style={direction?{direction:"rtl"}:{}}>
      <div className={styles.title}>
        <span>{t(title)}  </span>
        {top15?<span>Top-15</span>:<span style={{display:"none"}}></span>}
      </div>
      <div className={styles.separator}></div>
      <div className={styles.buttons}>
        <button type='button' onClick={downloadCSV} className={styles.csvButton}>
          <span>CSV</span>
        </button>
        <div className={styles.seperator}></div>
        <button type='button' onClick={downloadPNGBase64} className={styles.svgButton}>
          <span>PNG</span>
        </button> 
      </div>
    </div>
  );
}

export default HeaderAmchart5;
