import { useUserContext } from '@/Context/ContextApi/UserContext';
import { EsriUrlUse } from '@/Core/Constant/EsriUrl';
import { TableName } from '@/Core/Enums/Esri-Enum/Table-Enum';
import { queryClientEnum } from '@/Core/Enums/QueryClientEnum';
import { Reference_Jordan_Governorates } from '@/Core/Reference/Jordan_Governorates';
import { Reference_Jordan_Liwa } from '@/Core/Reference/Jordan_Liwa';
import { Reference_Jordan_Qada } from '@/Core/Reference/Jordan_Qada';
import useEsriUrls from '@/Services/Esriservice/Get.Service/Get.EsriUrl';
import getEsriData from '@/Services/Esriservice/GetEsriData/getEsriData';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

interface ILayerMap {
    [key: string]: string;
}

interface ILayerItem {
    label: string;
    value: any; 
}

interface IEsriData {
    layerUrls: ILayerMap;
    Governorates: ILayerItem[];
    Liwa: ILayerItem[];
    Quda: ILayerItem[];
}

interface IEsriError {
    message: string;
}

function formatLayerData(data, NameUse) {
    return data?.res?.map((item: any) => ({
        label: item?.[NameUse],
        value: item,
    }));
}

async function fetchEsriLayers(layerUrls: any, i18n: any,esriToken): Promise<IEsriData> {
    try {
        const languageIsEnglish = i18n.language === "en";

        const layerRequests = [
            getEsriData(EsriUrlUse.Governorate,{token:esriToken}),
            getEsriData(EsriUrlUse.Districts,{token:esriToken}),
            getEsriData(EsriUrlUse.Sub_Districts,{token:esriToken}),
        ];
        

        const layerResponses = await Promise.all(layerRequests);
 
        
        return {
            layerUrls,
            Governorates: formatLayerData(layerResponses[0], languageIsEnglish?Reference_Jordan_Governorates[1]:Reference_Jordan_Governorates[2]),
            Liwa: formatLayerData(layerResponses[1], languageIsEnglish?Reference_Jordan_Liwa[1]:Reference_Jordan_Liwa[2]),
            Quda: formatLayerData(layerResponses[2], languageIsEnglish?Reference_Jordan_Qada[1]:Reference_Jordan_Qada[2]),
        };
    } catch (error) {
        throw error;
    }
}

function useGovernoratesLiwaQada(): UseQueryResult<IEsriData, IEsriError> {
    const { i18n } = useTranslation();
    const {data:EsriUrls}=useEsriUrls();
    const {esriToken}=useUserContext();

    return useQuery<IEsriData, Error>({
        queryKey: [`${queryClientEnum[0]}`,i18n.language ], 
        queryFn: () => fetchEsriLayers(EsriUrls, i18n,esriToken),
        enabled:EsriUrls?true:false
    });
}

export default useGovernoratesLiwaQada;
