import React, { useEffect, useState } from 'react';
import useFilteredPlaceData from './PlaceSearch';
import PostSwaggerData from '@/Services/ApiService/Get(Post).Swagger.Data';

function useGetDataAllMonthCategory({ DataPasingFromModal, service, enable, YearAndMonth }) {
    const { PlaceSelectCode, filters } = useFilteredPlaceData({ DataPasingFromModal });
    const [dataWillPass, setDataWillPass] = useState<any>(undefined);

    const generateMonthFilters = (year) => {
        return Array.from({ length: 12 }, (_, i) => ({
            propertyName: "Month",
            operation: 0,
            value: i + 1
        })).concat({ propertyName: "Year", operation: 0, value: year });
    };

    const baseFilters = generateMonthFilters(YearAndMonth?.year);
    const filterConditions = PlaceSelectCode?.wplace || PlaceSelectCode?.subDistrictCode || 
                             PlaceSelectCode?.districtCode || PlaceSelectCode?.govCode;

    let FilterWillUse:any = { filters: [...filters?.filters, ...baseFilters],"operator":"or" };
    
    const UrlValue = PlaceSelectCode?.wplace ? service.Point :
                     PlaceSelectCode?.subDistrictCode ? service.SubDistrict :
                     PlaceSelectCode?.districtCode ? service.District :
                     PlaceSelectCode?.govCode ? service.Governorate :
                     service.Totla;

    const { data, isFetching, isError,isLoading } = PostSwaggerData({
        Url: UrlValue || "",
        body: FilterWillUse,
        enable: (!!UrlValue && enable),
        queryKey: [UrlValue, JSON.stringify(FilterWillUse), JSON.stringify(YearAndMonth)]
    });

    useEffect(() => {
        if (data) {
            setDataWillPass(data?.results ? data : { results: [data], count: 1 });
        } else {
            setDataWillPass({ results: [], count: 1 });
        }
    }, [data]);

    return { data: dataWillPass, isFetching, isError,isLoading };
}

export default useGetDataAllMonthCategory;
