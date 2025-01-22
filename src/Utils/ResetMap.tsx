
import { PlaceSelectReducer } from "@/Context/Redux/Reducer/MainReducer";
import { DataUsePlaceSearch } from "@/Core/Constant/DataUse-PlaceSearch";
import { ArchgisConstant } from "@/Core/Constant/Esri-Constant";
import { resetMapView } from "./EsriUtils/resetMapView";

export class ResetMap{
  static async HeaderFilter({graphicLayerRef, view, dispatch, formOptionsSearch}) {
    if (graphicLayerRef && view) {
      graphicLayerRef.removeAll();  
      try {
        await view.when();
        await view.goTo({
          center: ArchgisConstant.MapConstant.center,
          zoom: ArchgisConstant.MapConstant.zoom
        });
      } catch (error) {}
    }
    dispatch(PlaceSelectReducer(DataUsePlaceSearch.initialvalue));
    formOptionsSearch.reset(DataUsePlaceSearch.initialvalue);
  }
   static ClearAll({MapContextReducer,dispatch}){
    const {graphicPointRef,graphicLayerRef,view} = MapContextReducer
    graphicPointRef?.removeAll();
    graphicLayerRef?.removeAll();
    resetMapView(view);
    dispatch(PlaceSelectReducer(DataUsePlaceSearch.initialvalue      ))
    const layersToRemove = view?.map.layers.filter((layer:any) => layer.type === "feature");
    layersToRemove?.forEach((layer:any) => view.map.remove(layer));  
 }
 static ClearPointLayer({MapContextReducer}){
   const {graphicPointRef,view} = MapContextReducer;
   const layersToRemove = view?.map.layers.filter((layer:any) => layer.type === "feature");
   layersToRemove?.forEach((layer:any) => view.map.remove(layer));  
 }
}


