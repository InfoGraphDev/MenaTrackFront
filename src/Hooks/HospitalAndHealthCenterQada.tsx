import React from 'react';
import useFilteredPlaceData from './PlaceSearch';
import PostSwaggerDataList from '@/Services/ApiService/Get(Post).Swagger.List';

function UseGetHospitalAndHealthCenterUnderSpicificQada({DataPasingFromModal,HospitalData,HealthCenterData,enable}) {
    const {filters} = useFilteredPlaceData({ DataPasingFromModal });
    const {data, isFetching,isError,isLoading}=PostSwaggerDataList({
        Urls:[HospitalData,HealthCenterData],
        body:{filters:[{propertyName: "subDistrictCode", operator: 'Equals', value: filters?.filters[0]?.value}]},
        enable: (enable),
        queryKey:[JSON.stringify(filters)]
    })

   return { data, isFetching,isError,isLoading };
}

export default UseGetHospitalAndHealthCenterUnderSpicificQada;

