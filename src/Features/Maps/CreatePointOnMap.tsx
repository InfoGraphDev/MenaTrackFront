import React from 'react';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import TextSymbol from '@arcgis/core/symbols/TextSymbol';
import LocationLandImage from "@/Assets/Images/Home.png";

export const CreatePointOnMap = ({ graphicPointRef, data,DataMain,IsArabic }) => {
    let AllDataUse=data?.filter((data)=>(data?.DAM_ID));
    graphicPointRef?.removeAll();
    let AllLabel = [];
    const allGraphicLayer = AllDataUse?.map(item => {
        const textSymbol = new TextSymbol({
            text:IsArabic?item?.DAM_NAME_ARABIC:item?.DAM_NAMEName,
            font: {
                size: 10,
            },
            color: "black",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            xoffset: 0,
            yoffset: -29
        });

        const pointGeometry = new Point({
            longitude: item?.X_COORD,
            latitude: item?.Y_COORD,
        });

        const labelGraphic = new Graphic({
            geometry: pointGeometry,
            symbol: textSymbol
        });

        AllLabel.push(labelGraphic);
        const markerSymbol = new PictureMarkerSymbol({
            url: LocationLandImage,
            width: "30px",
            height: "30px",
        });
        return new Graphic({
            geometry: pointGeometry,
            symbol: markerSymbol,
            attributes: { ...DataMain?.keyData[item?.DAM_ID], AllowClick: true },
        });
    });
    graphicPointRef.addMany(allGraphicLayer);
    graphicPointRef.addMany(AllLabel);
    return null;
};
