import React from 'react';
import TextSymbol from '@arcgis/core/symbols/TextSymbol';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';

function CreateTextOnMap({view,text,setTooltipShowMouse,setPropertyDeletedItem}) {
    let clickEventHandler = null;

    function handleClick(event) {
        const mapPoint = view.toMap({
            x: event.x,
            y: event.y
        });

        const clickLocation = view.toMap({ x: event.x, y: event.y });
        CreateText(clickLocation,mapPoint);

        if (clickEventHandler) {
          clickEventHandler.remove();
          setTooltipShowMouse(false)
      }
    }
 
    clickEventHandler = view.on("click", handleClick);

    function CreateText(mapPoint){

        const textSymbol = new TextSymbol({
            text: text,
            color: "#1D2951",
            haloColor: "#F0F8FF", 
            haloSize: "2px",
            xoffset: 3,
            yoffset: 3,
            font: {
                size: 12, 
            },
            border: {
                color: "#1D2951", 
                width: "1px",
                radius: "5px" 
            },
        });
            const point = new Point(mapPoint);
            const graphic = new Graphic({
                geometry: point,
                symbol: textSymbol
            });

            if(setPropertyDeletedItem){
                setPropertyDeletedItem((prevItems:any) => [...prevItems, {geometry:point,tool:"text" }]);
              }
      
    }

}

export default CreateTextOnMap
