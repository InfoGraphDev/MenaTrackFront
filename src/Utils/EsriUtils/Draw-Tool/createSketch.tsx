import Graphic from '@arcgis/core/Graphic';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import Color from '@arcgis/core/Color';
import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';

interface CreateSketchParams {
  graphicLayer?: { removeAll: () => void; add: (graphic: Graphic) => void };
  OtherGraphicLayerToRemove?: { removeAll: () => void };
  tool?: string;
  mode?: string;
  preventRemove?:boolean,
  setgeometrySearchValue?: (geometry: any) => void; 
  setTooltipShowMouse?:any,
  t:any;
  addNotification:any,
  setPropertyDeletedItem?:any,
  view:any,
  DontShowArea?:boolean|undefined
}

export default function createSketch({
  graphicLayer,
  OtherGraphicLayerToRemove,
  tool = "polygon",
  mode = "click",
  preventRemove,
  setgeometrySearchValue,
  setTooltipShowMouse,
  DontShowArea,
  setPropertyDeletedItem,
  t,
  addNotification,
  view
}: CreateSketchParams): void {

  try {
    if(!preventRemove){
      graphicLayer?.removeAll();
      OtherGraphicLayerToRemove?.removeAll();  
    }
    
    const sketchVM = new SketchViewModel({
      view,
      layer: graphicLayer,
    });

    sketchVM.activeFillSymbol = new SimpleFillSymbol({
      color: new Color([128, 128, 128, 0.18]),
      style: "solid",
      outline: new SimpleLineSymbol({
        color: new Color([255, 0, 0]),
        width: 1.5,
        style: "dash"
      })
    });
    sketchVM.create(tool, { mode });

    sketchVM.on("create", (event) => {
      if (event.state === "complete" && event.graphic) {

        const polygonGraphic:any = new Graphic({
          geometry: event.graphic.geometry,
          symbol: sketchVM.activeFillSymbol
        });
        if(setPropertyDeletedItem){
          setPropertyDeletedItem((prevItems:any) => [...prevItems, {geometry:event.graphic.geometry,tool:tool }]);
        }
        graphicLayer?.add(polygonGraphic);
        setgeometrySearchValue?.(polygonGraphic.geometry);
        if(setTooltipShowMouse){
          setTooltipShowMouse(false)
        }
        if(!DontShowArea){
          const areaInSquareMeters = geometryEngine.geodesicArea(polygonGraphic.geometry, "square-meters");
          const areaInSquareKilometers = areaInSquareMeters / 1000000; 
          addNotification({message:`${t('common.Theareainsquare')} (${Number(areaInSquareKilometers.toFixed(0)).toLocaleString()}) km^2`,type:"info"})
        }
      }
      
    });
  } catch (error) {}
}


