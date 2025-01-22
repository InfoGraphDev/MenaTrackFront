import { ArchgisConstant } from '@/Core/Constant/Esri-Constant';
import Graphic from '@arcgis/core/Graphic';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';

type HandleZoomParams = {
  GeomatryValue: any;
  MapContextReducer: any;
};

export const  CreateGeomatryPlace = async({ GeomatryValue,MapContextReducer}: HandleZoomParams) => {
  const {view,graphicLayerRef,graphicPointRef}=MapContextReducer;

  const fillSymbol = new SimpleFillSymbol(ArchgisConstant.activeFillSymbol);

  const polygonGraphic = new Graphic({
    geometry: GeomatryValue,
    symbol: fillSymbol
  });
  const layersToRemove = view.map.layers.filter((layer:any) => layer.type === "feature");
  // layersToRemove.forEach((layer:any) => view.map.remove(layer));  
  graphicLayerRef?.removeAll();
  graphicPointRef?.removeAll();
  graphicLayerRef.add(polygonGraphic);
  view.goTo(polygonGraphic);
};
