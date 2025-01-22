import React, { useMemo } from 'react';
import styles from "./header.module.scss";
import logo from "@/Assets/Images/main-logo.png";
import { useTranslation } from 'react-i18next';
import SearchFilterHeader from './search-filter/index';
import HeaderListIcons from './icons';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import LazyLoadImage from '@/Components/UIElements/DataDisplay/LazyImage';
import { useNavigate } from 'react-router-dom';

const HeaderMain = () => {
    const { t } = useTranslation();
    const isArabicLanguage=useIsArabicLanguage();
    const Navigate=useNavigate();

    const headerStyle = useMemo(() => {
        return isArabicLanguage ? { paddingLeft: "2rem" } : { paddingRight: "2rem" };
    }, [isArabicLanguage]);

    const handelResetMap=()=>{
        Navigate(`/`)
    }

    return (
            <header className={styles.header} style={headerStyle}>
                <FlexComponent className={styles.logoContainer}>
                    <FlexComponent className={styles.logo} onClick={handelResetMap}>
                        <LazyLoadImage alt='TRC Logo' src={logo}/>
                    </FlexComponent>
                    <FlexComponent flexDirection='column' alignItems='flex-start'>
                        <span className={styles.title}>{t("header.mainTitle")}</span>
                        <span className={styles.description}>{t("header.titleDescription")}</span>
                    </FlexComponent>
                </FlexComponent>
                <SearchFilterHeader/>
                <HeaderListIcons/>
            </header>
    );
}

export default HeaderMain;
