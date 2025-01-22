import React, { useEffect, useState } from 'react';
import useFilteredPlaceData from './PlaceSearch';
import PostSwaggerData from '@/Services/ApiService/Get(Post).Swagger.Data';

function UseGetDataDependFilterLocationAndDate({ DataPasingFromModal, service, enable, YearAndMonth }) {
    const { PlaceSelectCode, filters } = useFilteredPlaceData({ DataPasingFromModal });
    const [dataWillPass, setDataWillPass] = useState<any>(undefined);

    const generateFilters = () => {
        const baseFilters = [{ propertyName: "Year", operation: 0, value: YearAndMonth?.year }];
        if (YearAndMonth?.month) {
            baseFilters.unshift({ propertyName: "Month", operation: 0, value: YearAndMonth?.month });
        }
        return PlaceSelectCode?.wplace || PlaceSelectCode?.subDistrictCode || 
               PlaceSelectCode?.districtCode || PlaceSelectCode?.govCode
            ? { pageSize: 10, pageNumber: 0, filters: [...filters?.filters, ...baseFilters] }
            : baseFilters;
    };

    const FilterWillUse = generateFilters();
    const UrlValue = PlaceSelectCode?.wplace ? service.Point :
                     PlaceSelectCode?.subDistrictCode ? service.SubDistrict :
                     PlaceSelectCode?.districtCode ? service.District :
                     PlaceSelectCode?.govCode ? service.Governorate :
                     service.Totla;
    const { data, isFetching, isError } = PostSwaggerData({
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

    return { data: dataWillPass, isFetching, isError };
}

export default UseGetDataDependFilterLocationAndDate;
