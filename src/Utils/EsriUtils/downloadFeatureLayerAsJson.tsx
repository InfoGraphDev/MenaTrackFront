import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Query from '@arcgis/core/rest/support/Query';

const DownloadFeatureLayerAsJson = (url) => {
  const featureLayer = new FeatureLayer({
    url,
    outFields: ["*"]
  });

  const query = new Query();
  query.where = '1=1'; // You can customize this to filter the features
  query.outFields = ['*'];
  query.returnGeometry = true;

  featureLayer.queryFeatures(query)
    .then(result => {
      const features = result.features.map(feature => feature.toJSON());
      const json = JSON.stringify(features, null, 2);
      downloadJson(json, 'feature_layer.json');
    })
    .catch(error => {
      console.error('Error querying features:', error);
    });
};

const downloadJson = (json, filename) => {
  const blob = new Blob([json], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default DownloadFeatureLayerAsJson;
