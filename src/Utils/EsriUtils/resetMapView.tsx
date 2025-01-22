import { ArchgisConstant } from '@/Core/Constant/Esri-Constant';
import MapView from '@arcgis/core/views/MapView';

interface InitialMapViewProperties {
  center: [number, number]; 
  zoom: number;
}

const initialMapViewProperties: InitialMapViewProperties = {
  center: ArchgisConstant.MapConstant.center, 
  zoom: ArchgisConstant.MapConstant.zoom , 
};

export const resetMapView = (view: MapView): void => {
    view.goTo({
      center: initialMapViewProperties.center,
      zoom: initialMapViewProperties.zoom
    });
  
  };
  