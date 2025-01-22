import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '../Api';

interface DataPostType {
    [key: string]: string;
}

interface PostSwaggerDataProps {
    Urls: string[],
    body?: any,
    enable?: boolean,
    queryKey?: any
}

async function fetchData(Url: string, body: any): Promise<DataPostType> {
    try {
        const response = await api.post(Url, body);
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        throw error;
    }
}

async function fetchAllData(Urls: string[], body: any): Promise<DataPostType[]> {
    try {
        const responses = await Promise.all(Urls.map(url => fetchData(url, body)));
        return responses;
    } catch (error) {
        throw error;
    }
}

function GetPostMethodSwaggerDataList({ Urls, body, enable = true, queryKey }: PostSwaggerDataProps): UseQueryResult<DataPostType[], Error> {
    return useQuery<DataPostType[], Error>({
        queryKey: [Urls, body, queryKey],
        queryFn: () => fetchAllData(Urls, body),
        enabled: enable,
    });
}

export default GetPostMethodSwaggerDataList;
