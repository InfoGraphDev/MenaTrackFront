import React from 'react'
import styles from "./style.module.scss";
import SelectLanguage from './SelectLanguage/index';
import DarkModeSwitch from './DarkMode';

function HeaderListIcons() {    

    return (
    <div className={styles.container}>
        <div className={styles.profile}   >
            <SelectLanguage/>
            <div className={styles.divider}></div>
            <DarkModeSwitch/>
        </div>
    </div>
)
}

export default HeaderListIcons;

