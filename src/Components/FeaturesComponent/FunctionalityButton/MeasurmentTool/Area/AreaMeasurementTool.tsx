import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import "./style.scss";

function AreaMeasurementTool({ areaRef }) {
  const { t } = useTranslation();
  const observerRef = useRef(null);

  useEffect(() => {
    const observerCallback = (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const unitSelectLabel = document.querySelector('.esri-unit-select__label');
          const clearButton = document.querySelector('.esri-area-measurement-2d__clear-button');
          const FirstMeasure=document.querySelector(".esri-measurement-widget-content__measurement")?.firstChild?.firstChild;
          const LastMeasure=document.querySelector(".esri-measurement-widget-content__measurement")?.lastChild?.firstChild;
          const Hint=document.querySelector(".esri-measurement-widget-content__hint-text");

          if(FirstMeasure)FirstMeasure.textContent=t("areaMeasurement.Areameasurement");
          if(LastMeasure)LastMeasure.textContent=t("areaMeasurement.Measureperimeter");
          if (unitSelectLabel) unitSelectLabel.textContent = t("areaMeasurement.Unitofmeasure");
          if (clearButton) clearButton.textContent = t("areaMeasurement.Clickheretocreatethemeasurement");
          if(Hint) Hint.textContent=t("areaMeasurement.Pleasestarttheprocessofdrawingonthemap")
        }
      }
    };

    const config = { attributes: false, childList: true, subtree: true };

    observerRef.current = new MutationObserver(observerCallback);
    if (areaRef.current) {
      observerRef.current.observe(areaRef.current, config);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [areaRef, t]);

  return (
    <div className='container-area-measurment-tool'>
        <div ref={areaRef} className="area-measurement-tool"></div>
    </div>

  );
}

export default AreaMeasurementTool;
