import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

export function CreateGraphicLayer({view,Refrance}) {
    const graphicLayer=new GraphicsLayer();
    
    if(view){
        view.map.add(graphicLayer);
        Refrance.current=graphicLayer
    }
}

