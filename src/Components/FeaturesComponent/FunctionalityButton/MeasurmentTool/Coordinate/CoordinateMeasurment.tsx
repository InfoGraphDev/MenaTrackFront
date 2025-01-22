import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import "./style.scss";

function CoordinateMeasurmentTool({ coordinateRef }) {
  const { t } = useTranslation();
  const observerRef = useRef(null);

  useEffect(() => {
    const observerCallback = (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const SelectOptions = document.querySelectorAll('.esri-coordinate-conversion__select-row option');
          SelectOptions.forEach(option => {
            switch(option.getAttribute('aria-label')) {
              case 'basemap':
                option.textContent = t("Coordenate.Basemap");
                break;
              case 'dd':
                option.textContent =  t("Coordenate.DD");
                break;
              case 'ddm':
                option.textContent =  t("Coordenate.DDM");
                break;
              case 'dms':
                option.textContent =  t("Coordenate.DMS");
                break;
              case 'xy':
                option.textContent =  t("Coordenate.XY");
                break;
              case 'mgrs':
                option.textContent =  t("Coordenate.MGRS");
                break;
              case 'usng':
                option.textContent =  t("Coordenate.USNG");
                break;
              case 'utm':
                option.textContent =  t("Coordenate.UTM");
                break;
              default:
                break;
            }
          });
        }
      }
    };

    const config = { attributes: false, childList: true, subtree: true };
    observerRef.current = new MutationObserver(observerCallback);
    if (coordinateRef.current) {
      observerRef.current.observe(coordinateRef.current, config);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [coordinateRef, t]);

  return (
    <div className='container-area-measurment-tool'>
        <div ref={coordinateRef} className="coordenate-measurement-tool"></div>
    </div>

  );
}

export default CoordinateMeasurmentTool;
