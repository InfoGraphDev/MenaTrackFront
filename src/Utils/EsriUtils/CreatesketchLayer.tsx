import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";

export   function CreateSketchLayer({view,graphicLayer}){
    const sketchVMInit = new SketchViewModel({
        view,
        layer: graphicLayer,
      });

      return sketchVMInit;
}