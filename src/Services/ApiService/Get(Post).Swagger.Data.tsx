import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '../Api';

interface DataPostType {
    [key: string]: string;
}

interface PostSwaggerData{
    Url:string,
    body?:any,
    enable?:boolean,
    queryKey?:any
}

async function fetchData(Url,body): Promise<DataPostType> {
    try {
        const response = await api.post(Url,body)
        if (response.status === 200 && response.data) {
            return response.data
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        throw error;
    }
}

function GetSwaggerUsePostMethod({Url,body,enable=true,queryKey}:PostSwaggerData): UseQueryResult<DataPostType, Error> {
    return useQuery<DataPostType, Error>({
        queryKey: [Url,body,queryKey],
        queryFn: () => fetchData(Url,body),
        enabled:enable
    });
}

export default GetSwaggerUsePostMethod;
