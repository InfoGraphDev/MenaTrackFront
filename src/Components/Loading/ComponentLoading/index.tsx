import FlexComponent from '@/Components/UIElements/Layout/Flex'
import React from 'react'
import styles from "./style.module.scss";
import { ScaleLoader } from 'react-spinners';

function ComponentLoading() {
  return (
    <FlexComponent className={styles.container}>
      <li className={styles.icon}>
        <ScaleLoader color='#46b54f' height={60} width={7} />
      </li>
    </FlexComponent>
  );
}

export default ComponentLoading;
