import React, { useContext, useCallback, useMemo, useState } from 'react';
import styles from "./style.module.scss";
import { useDispatch } from 'react-redux';
import { MapContext } from '@/Features/Maps/Maps';
import { MyLocationMarker } from '@/Utils/EsriUtils/Draw-Tool/My-Location';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import FloatButtonComponent from '@/Components/UIElements/General/FloatButton';
import SpaceComponent from '@/Components/UIElements/Layout/Space';
import MeasurementTool from './MeasurmentTool';
import screenfull from 'screenfull';

const FunctionalityButton = (() => {
    const { view, graphicPointRef } = useContext(MapContext);
    const dispatch = useDispatch();
    const isArabicLanguage = useIsArabicLanguage();
    const [MeasurmentToolOpen,setMeasurmentToolOpen]=useState(false)

    const handleButtonClick = useCallback((value:any) => {
        switch(value) {
            case 1:
                view.zoom += 1;
                break;
            case 2:
                view.zoom -= 1;
                break;
            case 3:
                MyLocationMarker({ graphicPointRef, view });
                break;
            case 4:
                setMeasurmentToolOpen(true);
                break;    
            case 5:
                if (screenfull.isEnabled) {
                    screenfull.toggle(); 
                }         
                break;                 
            default:
                break;
        }
    }, [dispatch, view, graphicPointRef]);

    const dataUseOne = useMemo(() => [
        { title: "FunctionalityButton.zoomin", icon: 'ZoomInSvg', value: 1 },
        { title: "FunctionalityButton.zoomout", icon: 'ZoomOutSvg', value: 2 },
    ], []);
    const dataUseTwo = useMemo(() => [
        { title: "FunctionalityButton.MyLocation", icon: 'LocationSvg', value: 3 },
    ], []);
    const dataUseThree = useMemo(() => [
        { title: "FunctionalityButton.Measuringinstruments", icon: 'MeasurmentSvg', value: 4 },
    ], []);
    const dataUseFour = useMemo(() => [
        { title: "FunctionalityButton.Fullscreen", icon: 'FullScreenSvg', value: 5 },
    ], []);

    return (
        <div className={`${styles.container} ${isArabicLanguage ? styles.arabic : styles.english}`}>
            <FloatButtonComponent DataUse={dataUseFour} handleOnClick={handleButtonClick} />
            <SpaceComponent bottom='.5rem'/>
            <FloatButtonComponent DataUse={dataUseOne} handleOnClick={handleButtonClick} />
            <SpaceComponent bottom='.5rem'/>
            <FloatButtonComponent DataUse={dataUseTwo} handleOnClick={handleButtonClick} />
            <SpaceComponent bottom='.5rem'/>
            <div style={{position:"relative"}}>
                <FloatButtonComponent  DataUse={dataUseThree} handleOnClick={handleButtonClick} />
                {MeasurmentToolOpen&&
                 <MeasurementTool setMeasurmentToolOpen={setMeasurmentToolOpen} />}
            </div>
            <SpaceComponent bottom='.5rem'/>

        </div>
    );
});

export default FunctionalityButton;
