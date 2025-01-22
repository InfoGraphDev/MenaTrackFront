import React from 'react'
import styles from "./style.module.scss";

function InfinitProgressBar() {
  return (
    <div className={styles["demo-container"]}>
    <div className={styles["progress-bar"]}>
        <div className={styles["progress-bar-value"]}></div>
    </div>
    </div> 
    )
}

export default InfinitProgressBar
