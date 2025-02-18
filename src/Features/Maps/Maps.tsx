import FunctionalityButton from '@/Components/FeaturesComponent/FunctionalityButton';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CreateMapView } from '@/Utils/EsriUtils/CreateMapView';
import { MouseFunction } from '@/Utils/EsriUtils/Mouse-function';
import BaseMapComponent from '@/Components/FeaturesComponent/BaseMap/BaseMap';
import SearchComponent from '../Container/SearchComponent';
import styles from "./style.module.scss";
import MainFeatureLayerComponent from '@/Components/FeaturesComponent/MainFeatureLayerComponent';
import { Outlet, useLocation } from 'react-router-dom';
import { CreateGraphicLayerDependState } from '@/Utils/EsriUtils/CreateGraphicState';
import { useSetlongitudeAndLatitude } from '@/Context/Zustand';
import ShowLangAndLatComponent from '@/Components/FeaturesComponent/ShowLanAndLat';
import { useDispatch } from 'react-redux';
import { useModalContext } from '@/Components/UIElements/Feedback/Modal/hook';
import WelcomePage from '../WelcomePage';
import { useUserContext } from '@/Context/ContextApi/UserContext';
import useArcGISLayerComponent from './ArcGISLayerComponent';
import { SideBarSelectInfoReducer } from '@/Context/Redux/Reducer/MainReducer';
import { ComplainConstant } from '@/Core/Constant/DataComplain';
import Graphic from '@arcgis/core/Graphic';
import TextSymbol from '@arcgis/core/symbols/TextSymbol';
import LegendComponentShow from './LegendComponentShow';
import { useForm } from 'react-hook-form';
import FilterComponentTRC from './FilterComponent';
import Point from '@arcgis/core/geometry/Point';

const MapContainerMain: React.FC = () => {
  const mapRef=useRef(null);
  const [view,setView]=useState<any>(null);
  const [AddFeatureLayer,SetAddFeatureLayer]=useState(false);
  const RefranceView=useRef<any>(null);  
  const [graphicLayerMainBoundary,setgraphicLayerMainBoundary]=useState<any>(null);
  const [graphicLayerRef,setgraphicLayerRef]=useState<any>(null);
  const [graphicPointRef,setgraphicPointRef]=useState<any>(null);
  const {setModalStatus}=useModalContext();
  const SetlongitudeAndLatitude=useSetlongitudeAndLatitude();
  const [MainGroupLayerWasCreat,setMainGroupLayerWasCreat]=useState(false);
  const dispatch=useDispatch();
  const {esriToken}=useUserContext();
  const location = useLocation();  
  const {ListData}=useArcGISLayerComponent({esriToken});
  const formOptionsData = useForm<FormData>({mode: 'all'});
  const [DataWillUseAfterFilter,setDataWillUseAfterFilter]=useState([]);
  
  useMemo(() => {
    function filterComplaints(data, filterCriteria) {
        return data.filter(complaint => {
            return Object.keys(filterCriteria).every(key => {
                if (filterCriteria[key]) {
                    const complaintValue = complaint[key] ? String(complaint[key]).toLowerCase() : '';
                    const filterValue = String(filterCriteria[key]).toLowerCase();
                    return complaintValue.includes(filterValue);
                }
                return true; 
            });
        });
    }

    setDataWillUseAfterFilter(filterComplaints(ListData, formOptionsData?.watch()));
}, [ListData, JSON.stringify(formOptionsData?.watch())]);


  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const Reference_No  = searchParams.get('Reference_No');
    return { Reference_No };
  };
  const { Reference_No } = getQueryParams();
    
  useEffect(()=>{
    if(DataWillUseAfterFilter?.length==0)return;
    let DataWillUseMain=DataWillUseAfterFilter?.filter((data)=>(data?.Reference_No==Reference_No));
    if(DataWillUseMain[0]){
      dispatch(SideBarSelectInfoReducer({ value: "0", data: DataWillUseAfterFilter,itemSelect:DataWillUseAfterFilter?.filter((data)=>(data?.Reference_No==Reference_No))}));
    }
  },[DataWillUseAfterFilter]);

  useEffect(()=>{
      if(!mapRef?.current) return;
      if(RefranceView.current) return;
      const newView= CreateMapView({container:mapRef.current});
      RefranceView.current=newView;
      setView(newView);
      return ()=>view && view.destroy;  
  },[]);

  useEffect(()=>{
    if(view&&!AddFeatureLayer){
      view.when(() => {
        !graphicLayerMainBoundary&&CreateGraphicLayerDependState({setValue:setgraphicLayerMainBoundary,view,ValueUpdate:graphicLayerMainBoundary});
        !graphicLayerRef && CreateGraphicLayerDependState({ setValue: setgraphicLayerRef, view, ValueUpdate: graphicLayerRef });
        !graphicPointRef && CreateGraphicLayerDependState({ setValue: setgraphicPointRef, view, ValueUpdate: graphicPointRef });
       {MouseFunction({dispatch,view,SetlongitudeAndLatitude,setModalStatus})}    
      });
    }
  },[view]);
  
  if(!esriToken){
    return(<WelcomePage/>)
  };

useEffect(()=>{
  if(DataWillUseAfterFilter?.length==0){
    graphicPointRef?.removeAll();
    return;
  }

  let ItemSelect=DataWillUseAfterFilter?.filter((data)=>(data?.Reference_No==Reference_No));

  const createCustomMarker = (color = "#FF0000", width = 40, height = 40, text = "C") => {
    const xmlns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", "0 0 50 75");
  
    const path1 = document.createElementNS(xmlns, "path");
    path1.setAttribute(
      "d",
      "M25 0C15 0 5 10 5 25c0 15 20 40 20 40s20-25 20-40C45 10 35 0 25 0z"
    );
    path1.setAttribute("fill", color);
    svg.appendChild(path1);
  
    const path2 = document.createElementNS(xmlns, "path");
    path2.setAttribute(
      "d",
      "M25 2C17 2 9 12 9 25c0 10 16 28 16 28s16-18 16-28c0-13-8-23-16-23z"
    );
    path2.setAttribute("fill", "rgba(255, 255, 255, 0.2)");
    svg.appendChild(path2);
  
    const textElement = document.createElementNS(xmlns, "text");
    textElement.setAttribute("x", "25");
    textElement.setAttribute("y", "32");
    textElement.setAttribute("font-family", "Arial");
    textElement.setAttribute("font-size", "24");
    textElement.setAttribute("fill", "white");
    textElement.setAttribute("font-weight", "bold");
    textElement.setAttribute("text-anchor", "middle");
    textElement.textContent = text;
    svg.appendChild(textElement);
  
    const svgData = new XMLSerializer().serializeToString(svg);
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
  };

  DataWillUseAfterFilter?.forEach((data) => {
    const color = ComplainConstant.CategoryColor[data.Category] || "#FF4500"; 
    const markerSymbol = {
      type: "picture-marker",
      url: createCustomMarker(color, 35, 35, "C"),
      width: "35px",
      height: "35px"
    };

    const textSymbol = new TextSymbol({
      text: data.Reference_No || "",
      rtl: true,
      font: {
        size: 10,
        weight: "bold",
      },
      color: "#000000",
      haloColor: "white",
      haloSize: "1px",
      yoffset: -18,
    });

    const pointGeometry = new Point({
      longitude: data?.Longitude,
      latitude: data?.Latitude
    });

    const pointGraphic = new Graphic({
      geometry:pointGeometry,
      symbol: markerSymbol,
      attributes: { ...data, AllowClick: true },
    });

    const textGraphic = new Graphic({
      geometry:pointGeometry,
      symbol: textSymbol,
      attributes: { ...data, AllowClick: true },
    });

    graphicPointRef.addMany([pointGraphic, textGraphic]);

    const pointGeometryMain = new Point({
      longitude: ItemSelect[0]?.Longitude,
      latitude: ItemSelect[0]?.Latitude
    });

    view.goTo({
      target: pointGeometryMain,
      zoom: 18
    });

  });
},[DataWillUseAfterFilter])

  return (
    <>
    <MapContext.Provider value={{
      view,
      graphicLayerRef,
      graphicPointRef,
      graphicLayerMainBoundary,
      setgraphicLayerRef,
      setgraphicPointRef}}>
            <>
              <div className={`${styles.containerMap}`}  
                   ref={mapRef}  style={{height:"100vh"}}></div>
                {(view)&&
                    <> 
                        <LegendComponentShow/>
                        <FilterComponentTRC 
                          formOptions={formOptionsData} 
                          DataWillUseAfterFilter={DataWillUseAfterFilter}/>
                        <FunctionalityButton/>
                                  {!MainGroupLayerWasCreat&&
                                    <MainFeatureLayerComponent 
                                      setMainGroupLayerWasCreat={setMainGroupLayerWasCreat} 
                                      SetAddFeatureLayer={SetAddFeatureLayer}/>} 
                             <Outlet/>
                            <BaseMapComponent/>
                            <ShowLangAndLatComponent/>
                        <SearchComponent/>
                    </>}
            </>
      </MapContext.Provider>
    </>
  );
};

export default MapContainerMain;

export interface MapContextInterface{
  view:any,
  graphicLayerRef:any,
  graphicPointRef:any,
  graphicLayerMainBoundary:any,
  setgraphicLayerRef:any,
  setgraphicPointRef:any
}
export const MapContext=React.createContext<MapContextInterface>({
  view:null,
  graphicLayerRef:null,
  graphicPointRef:null,
  graphicLayerMainBoundary:null,
  setgraphicLayerRef:()=>{},
  setgraphicPointRef:()=>{}
});

