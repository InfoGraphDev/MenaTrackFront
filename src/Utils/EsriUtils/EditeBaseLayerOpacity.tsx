export function EditBaseLayerOpacity(view){
    view.when(() => {
        view.map.basemap.baseLayers.items.forEach(layer => {
            layer.opacity = 1;
        });
    });
}