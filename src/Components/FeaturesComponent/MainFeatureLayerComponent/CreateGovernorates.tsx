import Graphic from '@arcgis/core/Graphic';
import Polygon from '@arcgis/core/geometry/Polygon';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import TextSymbol from '@arcgis/core/symbols/TextSymbol';
import Color from '@arcgis/core/Color';
import { GovernoratesConstant } from './DataUse/GovernoratesConstant';
import PalestineData from "./DataUse/Palestine.json";
import JordanBoundaries from "./DataUse/JordanBoundaries.json";
import SeasData from "./DataUse/seas.json";

export const CreateCityLayer = async ({ graphicLayerMainBoundary, isArabic,DarkMode,baseMapSelect }) => {
  let graphics = [];

  // [...GoveroratesData, ...PalestineData, ...JordanBoundaries, ...HealthDirectorates, ...SeasData]
  [ ...PalestineData, ...JordanBoundaries, ...SeasData].forEach((DataInsideArray) => {
    const Code = DataInsideArray?.Code;
    const geometryData = DataInsideArray?.geometry;
    const TitleUse = isArabic ? DataInsideArray?.arabic : DataInsideArray?.arabic;
    const spatialReference = geometryData?.spatialReference || { wkid: 4326 };

    const polygonGeometry = new Polygon({
      rings: geometryData.rings,
      spatialReference: spatialReference,
    });

    const { Outline, color, title } = GovernoratesConstant.DataUse(DarkMode,baseMapSelect)[Code];

    const fillSymbol = new SimpleFillSymbol({
      color: new Color(color),
      style: "solid",
      outline: new SimpleLineSymbol({
        color: new Color(Outline),
        width: 1,
        style: "solid",
      }),
    });

    const polygonGraphic = new Graphic({
      geometry: polygonGeometry,
      symbol: fillSymbol,
    });

    graphics.push(polygonGraphic);

    if (title) {
      const textSymbol = new TextSymbol({
        text: TitleUse,
        color: new Color("#6f757e81"),
        font: {
          size: 11,
          weight: "bold"
        },
        haloColor: new Color("#ffffff"), 
        haloSize: .5 
      });
      
      const centroid = polygonGeometry.centroid;

      const textGraphic = new Graphic({
        geometry: centroid,
        symbol: textSymbol
      });

      graphics.push(textGraphic);
    }
  });

  if (graphics.length > 0) {
    graphicLayerMainBoundary.addMany(graphics);
    return true;
  } else {
    return false;
  }
};