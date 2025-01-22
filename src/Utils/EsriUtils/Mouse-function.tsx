import { debounce } from "lodash";
import jordanBoundaryJson from "@/Core/Json/JordanBoundary.json";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import Polygon from "@arcgis/core/geometry/Polygon";
import Point from "@arcgis/core/geometry/Point";

interface MouseInterface {
  view: any;
  SetlongitudeAndLatitude?: any;
  dispatch: any;
  setModalStatus?: any;
}

var RingjordanBoundaryJson = jordanBoundaryJson[0]?.geometry?.rings;
var jordanBoundaryPolygon = new Polygon({
  rings: RingjordanBoundaryJson,
  spatialReference: { wkid: 4326 },
});

export function MouseFunction({
  dispatch,
  view,
  SetlongitudeAndLatitude,
  setModalStatus,
}: MouseInterface) {
  const setCursorStyle = (style: string) => {
    view.container.style.cursor = style;
  };

  const debouncedPointerMove = debounce((event: any) => {
    view
      .hitTest(event)
      .then((response: any) => {
        if (response.results.length) {
          const { latitude, longitude } = response.results[0].mapPoint;
          const point = new Point({
            latitude: latitude,
            longitude: longitude,
            spatialReference: { wkid: 4326 },
          });
          if (geometryEngine.contains(jordanBoundaryPolygon, point)) {
            SetlongitudeAndLatitude?.({
              latitude: latitude,
              longitude: longitude,
            });
            view.container.style.cursor = "pointer";
          } else {
            view.container.style.cursor = "default";
          }
        } else {
          view.container.style.cursor = "default";
        }

        if (
          response?.results?.length > 0 &&
          response?.results[0]?.graphic?.attributes?.AllowClick
        ) {
          setCursorStyle("pointer");
        } else {
          setCursorStyle("");
        }
      })
      .catch((error: any) => {
        console.error("Error in hitTest:", error);
      });
  }, 100);

  view.on("pointer-move", debouncedPointerMove);

  view.on("pointer-leave", function () {
    setCursorStyle("");
  });
  view.on("click", function (event: any) {
    view
      .hitTest(event)
      .then((response: any) => {
        if (response.results.length > 0) {
          const clickedGraphic = response.results[0].graphic;
          const attributes = clickedGraphic?.attributes;
          

       
          if (attributes?.AllowClick && attributes.IntersectLayer) {
            setModalStatus([{ type: "LayerInfo", value: attributes }]);
          }
          if (attributes?.AllowClick && !attributes.IntersectLayer) {
            setModalStatus([{ type: "AttributeInfo", value: attributes }]);
          }
        }
      })
      .catch((error: any) => {
        console.error("Error in hitTest:", error);
      });
  });
}
