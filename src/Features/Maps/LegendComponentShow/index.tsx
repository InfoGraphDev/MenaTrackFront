import React from "react";
import styles from "./style.module.scss";
import DividerComponent from "@/Components/UIElements/Layout/Divider";
import SpaceComponent from "@/Components/UIElements/Layout/Space";
import { ComplainConstant } from "@/Core/Constant/DataComplain";

function LegendComponentShow() {
  
  function truncateText(text, wordLimit = 18) {
    if (text.length > wordLimit) {
        return text.slice(0, wordLimit) + " ...";
    }
    return text;
}

  return(
        <div className={styles.legendContainer}>
          <SpaceComponent top="-1.3rem"/>
          <DividerComponent text="انواع الشكاوي"/>
          <SpaceComponent bottom="-1.3rem"/>
          <div>
            {ComplainConstant.CategoryInfo.map((item: any, index: number) => (
              <div key={index} className={styles.legendItem}>
                <div
                  className={styles.legendSquare}
                  style={{
                    backgroundColor: `rgba(${item.background.join(",")})`,
                    borderColor: `rgb(${item.outline.join(",")})`,
                  }}
                ></div>
                <span className={styles.legendText}>{truncateText(item.name)}</span>
              </div>
            ))}
          </div>
      </div>
  )

}

export default LegendComponentShow;
