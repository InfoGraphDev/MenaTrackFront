import { useQuery } from '@tanstack/react-query';
import getEsriData from '../Esriservice/GetEsriData/getEsriData';

export const useGetAllDamInformation=({enabled = true,queryKey})=>{
const fetchCropPercentage = async () => {
  let AllDataUse= await getEsriData(`${import.meta.env.VITE_ESRI_BASE_URL}/11`)  
  return AllDataUse?.res
};

return useQuery(
   {
    queryKey:[queryKey],
    queryFn:() => fetchCropPercentage(),
    enabled: enabled
   }
  );
}
