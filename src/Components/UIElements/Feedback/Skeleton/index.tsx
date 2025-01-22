import React from 'react';
import styles from './style.module.scss';
import { useTheme } from '@/Context/ContextApi/ThemeProvider';
import PrintSvg from '../../General/SVG/Icons/print';
import ListDetailsSvg from '@/Assets/Icons/listDetails';
import MainChartSvg from '../../General/SVG/Icons/MainChartSvg';
import ImageSvg from '@/Assets/Icons/image';
import TableSvg from '@/Assets/Icons/Table';

interface SkeletonProps {
  style?: React.CSSProperties;
  number?: number;
  type?: 'square' | 'rectangle' | 'chart' | 'image' | 'table'| 'list'| 'print';
}

const SkeletonComponent: React.FC<SkeletonProps> = ({
  style = {},
  number = 1,
  type = 'rectangle',
}) => {
  const array = new Array(number).fill(0);
  const baseSize = 16;
  const {isDarkMode}=useTheme()

  if (!style.height) {
    style.height = `${100 / baseSize}rem`;
  }
  if (!style.width) {
    style.width ='100%';
  }

  return (
    <div className={styles.container}>
      {array.map((_, i) => (
        <div key={i} className={`${styles.skeleton} ${styles[type]} ${isDarkMode&&styles.dark}`} style={style}>
            <div className={styles.icon}>
              {type=="chart"&&<MainChartSvg/>}
              {type=="image"&&<ImageSvg/>}
              {type=="table"&&<TableSvg/>}
              {type=="list"&&<ListDetailsSvg/>}
              {type=="print"&&<PrintSvg/>}
            </div>          
        </div>
      ))}
    </div>
  );
};

export default SkeletonComponent;
