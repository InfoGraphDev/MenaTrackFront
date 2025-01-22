import { useEffect, useState } from 'react';
import esriConfig from '@arcgis/core/config';
import getEsriData from '@/Services/Esriservice/GetEsriData/getEsriData';

const useArcGISLayerComponent = ({ esriToken }) => {
  const [loading,setisloading]=useState(false);
  const [ListData,setListData]=useState([]);

  useEffect(() => {
    const initializeArcGISLayer = async () => {
      setisloading(true);
      try {
        if (!esriToken) {
          return;
        }
        esriConfig.request.interceptors.push({
          urls: 'https://services8.arcgis.com/x4w6XRgDHZMjgHyN/arcgis/rest/',
          before: (params) => {
            params.requestOptions.query = {
              ...params.requestOptions.query,
              token: esriToken,
            };
          },
        });

        let DataWillUse= await getEsriData("https://services8.arcgis.com/x4w6XRgDHZMjgHyN/arcgis/rest/services/Complaints_Layer/FeatureServer/0");
        setListData(DataWillUse?.res);
      } catch (error) {
        console.error('Error initializing ArcGIS feature layer:', error);
      }finally{
        setisloading(false);
      }
    };
    initializeArcGISLayer();
  }, [esriToken]);
  
  return{
    loading,
    ListData
  }
};

export default useArcGISLayerComponent;