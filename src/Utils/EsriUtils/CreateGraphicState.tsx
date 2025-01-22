import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

export function CreateGraphicLayerDependState({view,setValue,ValueUpdate}) {
    const graphicLayer=new GraphicsLayer();
    if(view&&!ValueUpdate){
        view.map.add(graphicLayer);
        setValue(graphicLayer)
    }
}

