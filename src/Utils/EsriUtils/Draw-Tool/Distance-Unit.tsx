import Graphic from "@arcgis/core/Graphic";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Circle from '@arcgis/core/geometry/Circle';
import { ArchgisConstant } from "@/Core/Constant/Esri-Constant";

export function DistanceWithUnitCircle(
    {view, radius, unit,setTooltipShowMouse,
    setgeometrySearchValue, graphicLayerRef}) {
    graphicLayerRef.removeAll();
    let clickEventHandler = null;

    function handleClick(event) {
        const clickLocation = view.toMap({ x: event.x, y: event.y });
        addCircle(clickLocation);

        if (clickEventHandler) {
          setTooltipShowMouse(false)
          clickEventHandler.remove();
      }

    }

    clickEventHandler = view.on("click", handleClick);

    function addCircle(clickLocation) {
        const circleGeometry = new Circle({
            center: clickLocation,
            radius: radius,
            radiusUnit: unit
        });

        const fillSymbol = new SimpleFillSymbol(ArchgisConstant.activeFillSymbol);

        setgeometrySearchValue(circleGeometry);
        const circleGraphic = new Graphic({
            geometry: circleGeometry,
            symbol: fillSymbol
        });

        graphicLayerRef.add(circleGraphic);  
    }
}
