import { GridLayer, LayerTypeKey } from "@/Features/Maps/AddLayerOnMap/DataUse";
import { Polygon } from "@arcgis/core/geometry";

export function GeomatryAfterProjectionFuntion({grid,type,projectedPolygon,spatialReferenceWKID}){
    const adjustedCoordinates = GridLayer[0]===grid?(type==LayerTypeKey.FU?
        projectedPolygon?.rings[0].map(([x, y]) => [x + 87.579850337, y + 45.3765946244]):
        projectedPolygon?.rings[0].map(([x, y]) => [x + 71.779220412, y + 49.4228707637]))
        :
        projectedPolygon?.rings[0].map(([x, y]) => [x + 71.13484929967672, y + 49.659237458370626]);
        
      const polygonNew = new Polygon({
        rings: adjustedCoordinates,
        spatialReference: spatialReferenceWKID
      });

      return polygonNew;      
}