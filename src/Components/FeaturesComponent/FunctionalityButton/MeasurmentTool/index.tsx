import React, { useContext, useEffect, useRef, useState } from 'react';
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D';
import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D.js";
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion.js";
import { useTranslation } from 'react-i18next';
import AreaMeasurementTool from './Area/AreaMeasurementTool';
import DistanceMeasurmentTool from './Distance/DestanceMeasurmentTool';
import CoordinateMeasurmentTool from './Coordinate/CoordinateMeasurment';
import { MapContext } from '@/Features/Maps/Maps';
import TabsComponent from '@/Components/UIElements/DataDisplay/Tabs';
import SpaceComponent from '@/Components/UIElements/Layout/Space';
import styles from "./style.module.scss";
import TitleComponent from '@/Components/UIElements/Layout/Title';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';

function MeasurementTool({setMeasurmentToolOpen}) {
  const [selectOne, setSelectOne] = useState<any>(null);
  const areaRef = useRef(null);
  const distanceRef = useRef(null);
  const coordinateRef = useRef(null);
  const { t } = useTranslation();
  const { view } = useContext(MapContext);
  const IsArabic=useIsArabicLanguage();


  useEffect(()=>{
    if(selectOne==null){
      setSelectOne(0)
    }
  },[selectOne])

  useEffect(() => {
    let areaMeasurement:any, distanceMeasurement:any, coordinateConversion:any;

    if (view) {
      if (selectOne === 0) {
        areaMeasurement = new AreaMeasurement2D({
          view,
          container: areaRef.current
        });
      } else if (selectOne === 1) {
        distanceMeasurement = new DistanceMeasurement2D({
          view,
          container: distanceRef.current
        });
      } else if (selectOne === 2) {
        coordinateConversion = new CoordinateConversion({
          view,
          container: coordinateRef.current
        });
      }
    }

    return () => {
      areaMeasurement?.destroy();
      distanceMeasurement?.destroy();
      coordinateConversion?.destroy();
    };
  }, [selectOne, view]);

  const toggleButtonDataUse = [
    { title: "MeasurmentTool.areameasure", value: 0, icon: '' },
    { title: "MeasurmentTool.distancemeasure", value: 1, icon: '' },
    { title: "MeasurmentTool.Coordinates", value: 2, icon: '' }
  ];
  const handelClose=()=>{
    setMeasurmentToolOpen(false)
  }

  return (
    <div className={`${styles.container} ${IsArabic?styles.arabic:styles.english}`}>
      <TitleComponent title='FunctionalityButton.Measuringinstruments' SpecialClose={handelClose}/>
      <TabsComponent  
          DataUse={toggleButtonDataUse} 
          SelectOne={selectOne} setSelectOne={setSelectOne} />
      <SpaceComponent top='1.5rem'/>
      {selectOne===0&&<AreaMeasurementTool areaRef={areaRef} />}
      {selectOne===1&&<DistanceMeasurmentTool distanceRef={distanceRef} />}
      {selectOne===2&&<CoordinateMeasurmentTool coordinateRef={coordinateRef} />}
    </div>
  );
}

export default MeasurementTool;
