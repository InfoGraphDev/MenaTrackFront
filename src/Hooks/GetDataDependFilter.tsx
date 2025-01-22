import React, { useEffect, useState } from 'react';
import useFilteredPlaceData from './PlaceSearch';
import PostSwaggerData from '@/Services/ApiService/Get(Post).Swagger.Data';

function UseGetDataDependFilterLocation({DataPasingFromModal,service,enable,AddListLiwaOrQadaToSearchQuery}) {
    const { PlaceSelectCode, filters,listLiwaOrQada} = useFilteredPlaceData({ DataPasingFromModal });
        
    let UrlValue: string | undefined;
    const [dataWilPass,setdataWilPass]=useState<any>(undefined);

    let FilterUse;
    if(AddListLiwaOrQadaToSearchQuery&&listLiwaOrQada){
      FilterUse={...listLiwaOrQada,"operator": "or"}
    }else{
      FilterUse=filters;
    }
    
    if (PlaceSelectCode?.wplace) {
      UrlValue = service.Point;
    } else if (PlaceSelectCode?.subDistrictCode) {
      UrlValue = service.SubDistrict;
    } else if (PlaceSelectCode?.districtCode) {
      UrlValue = service.District;
    }else if(PlaceSelectCode?.govCode){
      UrlValue = service.Governorate;
    } else {
      UrlValue = service.Totla; 
    }

    const { data, isFetching,isError } = PostSwaggerData({
      Url: UrlValue?UrlValue:"",
      body: FilterUse,
      enable: (!!UrlValue&&enable),
      queryKey:[UrlValue,JSON.stringify(FilterUse)]
    });  

    useEffect(()=>{
      if(data){
        if(data?.results){
          setdataWilPass(data)
        }else{
          setdataWilPass({results:[data],count:1})
        }
      }else{
        setdataWilPass({results:[],count:1})
      }
    },[data]);

    return { data:dataWilPass, isFetching,isError };
}

export default UseGetDataDependFilterLocation;
