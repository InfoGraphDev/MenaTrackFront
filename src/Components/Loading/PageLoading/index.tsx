import React from 'react';
import styles from './style.module.scss';
import { useTranslation } from 'react-i18next';
import ComponentLoading from '../ComponentLoading';
const PageLoadingComponent = () => {
    const {t}=useTranslation();

  return (
    <div className={styles.container}>
      <ComponentLoading/>
    </div>
  );
};

export default PageLoadingComponent;