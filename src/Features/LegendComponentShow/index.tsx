import React from "react";
import { useSelector } from "react-redux";
import { ReduxInterface } from "@/Core/interface/Redux-interface";
import styles from "./style.module.scss";
import DividerComponent from "@/Components/UIElements/Layout/Divider";
import SpaceComponent from "@/Components/UIElements/Layout/Space";

function LegendComponentShow() {
  const IntersectionLegendView = useSelector(
    (state: ReduxInterface) => state.MainReducerApp.IntersectionLegendView
  );
  const BuffuerLegendView = useSelector(
    (state: ReduxInterface) => state.MainReducerApp.BuffurLegendView
  );
  
  function truncateText(text, wordLimit = 18) {
    if (text.length > wordLimit) {
        return text.slice(0, wordLimit) + " ...";
    }
    return text;
}

  return(
    <div>
      {IntersectionLegendView?.data?.length > 0&&
        <div className={styles.legendContainer}>
          <SpaceComponent top="-1rem"/>
          <DividerComponent text="الطبقات المتقاطعة"/>
          <div className={styles.innerContainer}>
            {IntersectionLegendView.data.map((item: any, index: number) => (
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
          {BuffuerLegendView?.data?.length>0&&
          <div>
            <DividerComponent text="النقاط القريبة"/>
            <div className={styles.innerContainer}>
              {BuffuerLegendView.data.map((item: any, index: number) => (
                <div key={index} className={styles.legendItem}>
                  <div
                    className={styles.legendCircule}
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
        }
      </div>}
      
    </div>
  )

}

export default LegendComponentShow;
