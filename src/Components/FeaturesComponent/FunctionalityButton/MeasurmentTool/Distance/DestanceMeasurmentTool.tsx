import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import "./style.scss";

function DistanceMeasurmentTool({ distanceRef }) {
  const { t } = useTranslation();
  const observerRef = useRef(null);

  useEffect(() => {
    const observerCallback = (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const unitSelectLabel = document.querySelector('.esri-unit-select__label');
          const clearButton = document.querySelector('.esri-distance-measurement-2d__clear-button');
          const Hint=document.querySelector(".esri-measurement-widget-content__hint-text");
          const Distance=document.querySelector(".esri-measurement-widget-content__measurement-item__title");
          if(Distance) Distance.textContent =t("areaMeasurement.Measuredistance");
          if (unitSelectLabel) unitSelectLabel.textContent = t("areaMeasurement.Unitofmeasure");
          if (clearButton) clearButton.textContent = t("areaMeasurement.Clickheretocreatethemeasurement");
          if(Hint) Hint.textContent=t("areaMeasurement.Pleasestarttheprocessofdrawingonthemap")
        }
      }
    };

    const config = { attributes: false, childList: true, subtree: true };
    observerRef.current = new MutationObserver(observerCallback);
    if (distanceRef.current) {
      observerRef.current.observe(distanceRef.current, config);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [distanceRef, t]);

  return (
    <div className='container-area-measurment-tool'>
        <div ref={distanceRef} className="distance-measurement-tool"></div>
    </div>

  );
}

export default DistanceMeasurmentTool;
