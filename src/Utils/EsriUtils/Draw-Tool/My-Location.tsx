import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import image from "@/Assets/Images/Home.png";
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';

export function MyLocationMarker({view,graphicPointRef}){
    const pictureMarkerSymbol = new PictureMarkerSymbol({
        angle: 0,
        height: 30,
        url: image,
        width: 30,
        xoffset: 0,
        yoffset: 0
      });
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            view.goTo({
                center: [longitude, latitude],
                zoom: 20
            });

            const point = new Point({
                longitude,
                latitude
            });

            const graphic = new Graphic({
                geometry: point,
                symbol: pictureMarkerSymbol
            });
            graphicPointRef.removeAll();
            graphicPointRef.add(graphic);
        }, (err) => {});
    } else {

    }

}