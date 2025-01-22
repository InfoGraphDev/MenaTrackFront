import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import Color from '@arcgis/core/Color';
import { LocalStorageEnum } from '../Enums/LocalStorage';
import topoMapImage from "../../Assets/Images/Type-map/topo-map.jpg";
import terrainMapImage from "../../Assets/Images/Type-map/terrain-map.jpg";
import satelliteMapImage from "../../Assets/Images/Type-map/satellite-map.jpg";
import streetsMapImage from "../../Assets/Images/Type-map/streets-map.jpg";

let haveData = localStorage.getItem(LocalStorageEnum[100]);
let basemap="satellite"

if(haveData){
  let item=JSON.parse(haveData)
  if (item && LocalStorageEnum[3] in item) {
    basemap=item[LocalStorageEnum[3]]
  } 
}

export class ArchgisConstant{
  static MapConstant={
    center:[35.5103, 31.2458],
    zoom:8,
    basemap:basemap
  }
  static CreateSketchTool={
    point:"point",
    polyline:"polyline",
    polygon:"polygon",
    rectangle:"rectangle",
    circle:"circle"
 }
  static CreateSketchMode ={
    hybrid:"hybrid",
    freehand:"freehand",
    click:"click"
  }

  static activeFillSymbol = {
    color: new Color([128, 128, 128, 0.18]),
    style: "solid",
    outline: new SimpleLineSymbol({
      color: new Color([255, 0, 0]),
      width: 1.5,
      style: "dash"
    })
  };

  static TypeBaseMap=[
    {title:"DetailsLegend.satelliteMap",image:satelliteMapImage,type:"satellite"},
    {title:"DetailsLegend.osmmap",image:topoMapImage,type:"osm"},
    {title:"DetailsLegend.streetsMap",image:streetsMapImage,type:"streets"},
    {title:"DetailsLegend.terrainMap",image:terrainMapImage,type:"topo-vector"},    
];
static ViewStylePoint={
  square:"square",
  circle:"circle",
  diamond:"diamond",
  triangle:"triangle"
}
}


enum AllBaseMap {
  "satellite"= 0,
  "hybrid"= 1,
  "oceans"= 2,
  "osm"= 3,
  "terrain"= 4,
  "dark-gray"= 5,
  "dark-gray-vector"= 6,
  "gray"= 7,
  "gray-vector"= 8,
  "streets"= 9,
  "streets-vector"= 10,
  "streets-night-vector"= 11,
  "streets-navigation-vector"= 12,
  "topo"= 13,
  "topo-vector"= 14,
  "streets-relief-vector"= 15
};
