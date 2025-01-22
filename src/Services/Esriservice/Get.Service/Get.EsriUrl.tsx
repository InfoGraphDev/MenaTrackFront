import { useQuery, UseQueryResult } from '@tanstack/react-query';
// import { ESRI_BASE_URL } from '@/Services/Api';
import { queryClientEnum } from '@/Core/Enums/QueryClientEnum';
import json from "./json.json";

interface LayerMap {
    [key: string]: string;
}

interface EsriLayer {
    id: number;
    name: string;
}

async function fetchEsriData(): Promise<LayerMap> {
    try {
        if (json.layers) {
            return processLayers(json.layers);
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        throw error;
    }
}

function processLayers(layers: EsriLayer[]): LayerMap {
    const layerMap: LayerMap = {};
    // layers.forEach(layer => {
    //     layerMap[layer.name] = `${ESRI_BASE_URL}/${layer.id}`;
    // });

    return layerMap;
}

function useEsriUrls(): UseQueryResult<LayerMap, Error> {
    return useQuery<LayerMap, Error>({
        queryKey: [queryClientEnum[1]],
        queryFn: fetchEsriData
    });
}

export default useEsriUrls;
