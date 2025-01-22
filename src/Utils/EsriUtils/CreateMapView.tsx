import { ArchgisConstant } from "@/Core/Constant/Esri-Constant";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { EditBaseLayerOpacity } from "./EditeBaseLayerOpacity";

interface CreateMapView {
  container: HTMLDivElement;
}

export function CreateMapView({ container }: CreateMapView) {
  const map = new Map({
    basemap: ArchgisConstant.MapConstant.basemap,
  });

  const isMobile = window.innerWidth <= 768;
  const view = new MapView({
    map,
    container,
    center: ArchgisConstant.MapConstant.center,
    zoom: ArchgisConstant.MapConstant.zoom,
    navigation: {
      mouseWheelZoomEnabled: !isMobile,
      browserTouchPanEnabled: true,
    },
    constraints: {
      minZoom: 5,
      maxZoom: isMobile ? 40 : 50,
      rotationEnabled: false,
    },
  });
  return view;
}
