import React, { useRef, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from "./style.module.scss";
import { ReduxInterface } from '@/Core/interface/Redux-interface';
import { useOutsideClick } from '@/Hooks/ClickOutsideHook';
import { ArchgisConstant } from '@/Core/Constant/Esri-Constant';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import { useTheme } from '@/Context/ContextApi/ThemeProvider';
import withLazyLoading from '@/Utils/LazyLoading';
import LazyLoadImage from '@/Components/UIElements/DataDisplay/LazyImage';
import LayerSvg from '@/Assets/Icons/Layer';
import FlexComponent from '@/Components/UIElements/Layout/Flex';

// Lazy-loaded components
const ShowItemBaseMap = withLazyLoading(() => import('./ShowItem'),{PageLoading:false});

const BaseMapSelectValue = {
  "satellite": ArchgisConstant.TypeBaseMap[0],
  "osm": ArchgisConstant.TypeBaseMap[1],
  "streets": ArchgisConstant.TypeBaseMap[2],
  "topo-vector": ArchgisConstant.TypeBaseMap[3],
  "oceans":ArchgisConstant.TypeBaseMap[4]
};

const BaseMapComponent = (() => {
    const [isOpen, setIsOpen] = useState(false);
    const typeViewRef = useRef(null);
    const { t } = useTranslation();
    const isArabicLanguage=useIsArabicLanguage();

    useOutsideClick(typeViewRef, () => setIsOpen(false));

    const baseMapSelect = useSelector(
      (state: ReduxInterface) => state.MainReducerApp.BaseMapSelect,
      (left, right) => left === right
    );

    const baseMapSelectValue = useMemo(() => BaseMapSelectValue[baseMapSelect], [baseMapSelect]);
    const {isDarkMode}=useTheme();

    return (
        <div >
          {!isDarkMode&&
            <div className={`${styles.layer} ${isOpen && styles.activeLayer} ${styles.english}`} onClick={() => setIsOpen(true)}>
              <LazyLoadImage alt='base-map'  src={baseMapSelectValue?.image}/>
                <FlexComponent gap='.3rem' className={styles.title}>
                  <span><LayerSvg className={styles.icon}/></span>
                  <span>{t(baseMapSelectValue?.title)}</span>
                </FlexComponent>
            </div>}
            {isOpen && <ShowItemBaseMap TypeViewRef={typeViewRef} />}
        </div>
    );
});

export default BaseMapComponent;
