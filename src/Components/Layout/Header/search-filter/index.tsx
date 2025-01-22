import React, { useContext } from 'react';
import styles from "./style.module.scss";
import { useForm } from 'react-hook-form';
import { MapContext } from '@/Features/Maps/Maps';
import { LocationMarkerCreate } from '@/Utils/EsriUtils/Draw-Tool/Location-Marker';
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';

interface FormData {
    hospitals: string; 
}

const SearchFilterHeader = (() => {
    const formOptions = useForm<FormData>({ mode: 'onChange',defaultValues:{year:new Date().getFullYear()} });
    const { view,graphicPointRef,graphicLayerRef }:any = useContext(MapContext);
    const isArabic=useIsArabicLanguage();

    const handelSelect = (data: any) => {
            let Geomatry=data?.geometry;
            LocationMarkerCreate({geometry:Geomatry,view,graphicPointRef,graphicLayerRef,DataSend:data,AllowClick:false})
    }

    return (
        <div className={`${styles.container} ${isArabic&&styles.arabic} `}>
      
        </div>
    );
}
)
export default SearchFilterHeader;

