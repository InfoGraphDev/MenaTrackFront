import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '../Api';

type DataGetType = any; 

interface GetSwaggerDataProps {
    Url: string | string[],
    params?: any,
    enable?: boolean,
    queryKey?: any
}

async function fetchData(Url: string | string[], params): Promise<DataGetType> {
    try {
        if (Array.isArray(Url)) {
            const promises = Url.map(singleUrl => api.get(singleUrl, { params }).then(res => res.data));
            const responses = await Promise.all(promises);
            return responses; 
        } else {
            const response = await api.get(Url, { params });
            if (response.status === 200 && response.data) {
                return response.data;
            } else {
                throw new Error('Failed to fetch data');
            }
        }
    } catch (error) {
        throw error;
    }
}

function GetSwaggerData({ Url, params, enable = true, queryKey }: GetSwaggerDataProps): UseQueryResult<DataGetType, Error> {
    const key = Array.isArray(Url) ? [...Url, params, queryKey] : [Url, params, queryKey];
    return useQuery<DataGetType, Error>({
        queryKey: key,
        queryFn: () => fetchData(Url, params),
        enabled: enable
    });
}

export default GetSwaggerData;
