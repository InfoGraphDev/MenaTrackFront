import Graphic from '@arcgis/core/Graphic';
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import image from "@/Assets/Images/Home.png";

export function LocationMarkerCreate({view,geometry,graphicPointRef,graphicLayerRef,DataSend,AllowClick=true}) {
    graphicPointRef.removeAll();
  
    const pictureMarkerSymbol = new PictureMarkerSymbol({
      angle: 0,
      height: 30,
      url: image,
      width: 30,
      xoffset: 0,
      yoffset: 0
    });
      const pointGraphic = new Graphic({
      geometry: geometry,
      symbol: pictureMarkerSymbol,
      attributes:{...DataSend,AllowClick}
    });
    view.goTo({
        target: geometry,
        zoom: 20
      });
      graphicPointRef.add(pointGraphic);
}



