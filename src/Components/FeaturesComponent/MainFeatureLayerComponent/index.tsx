import { memo, useContext, useEffect } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import { MapContext } from "@/Features/Maps/Maps";
import { useQuery } from "@tanstack/react-query";
import { CreateCityLayer } from "./CreateGovernorates";
import useIsArabicLanguage from "@/Hooks/IsArabicLanguage";
import { useTheme } from "@/Context/ContextApi/ThemeProvider";
import { useSelector } from "react-redux";
import { ReduxInterface } from "@/Core/interface/Redux-interface";

const createFeatureLayer = (Url) => {
  return new FeatureLayer({
    url:Url,
    outFields: ["*"]
  });
};

 async function fetchEsriLayers(view,setMainGroupLayerWasCreat) {
  const featureLayerIndices = [];

  const featureLayers = featureLayerIndices.map(createFeatureLayer);
  const groupedLayer = new GroupLayer({
    title: "MOH Feature Layers",
    visibilityMode: "inherited",
    layers: featureLayers,
  });

  if (view) {
    view.map.add(groupedLayer);
  }
  setTimeout(() => {
    setMainGroupLayerWasCreat(true)    
  }, 5000);
  return { message: "Feature layers successfully added to the map view." };
}

function MainFeatureLayerComponent({SetAddFeatureLayer,setMainGroupLayerWasCreat}) {
  const { view,graphicLayerMainBoundary } = useContext(MapContext);
  const isArabic=useIsArabicLanguage();
  const {theme}=useTheme();
  let DarkMode=theme=="light"?false:true;
  const baseMapSelect = useSelector(
    (state: ReduxInterface) => state.MainReducerApp.BaseMapSelect,
    (left, right) => left === right
  );

  useEffect(()=>{
    if(graphicLayerMainBoundary){
      async function GetData(){
        
        await CreateCityLayer({graphicLayerMainBoundary,isArabic,view,DarkMode});
        setTimeout(() => {
          SetAddFeatureLayer(true);          
        }, 1000);
      } GetData()
    }
    graphicLayerMainBoundary&&CreateCityLayer({graphicLayerMainBoundary,DarkMode,baseMapSelect});

  },[graphicLayerMainBoundary,DarkMode])

  const { error } = useQuery({
    queryKey: ["FetchAllLayerNeed"],
    queryFn: () => fetchEsriLayers(view,setMainGroupLayerWasCreat)
  });
  
  if (error) {
    console.error("Error loading feature layers:", error);
  }
  return null;
}

export default memo(MainFeatureLayerComponent);