import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ReduxInterface } from '@/Core/interface/Redux-interface';
import { DataUsePlaceSearch } from '@/Core/Constant/DataUse-PlaceSearch';

interface PlaceData{
  DataPasingFromModal?:any,
}

const useFilteredPlaceData = ({DataPasingFromModal}:PlaceData) => {
    const {PlaceSelect}=useSelector((state:ReduxInterface)=>(state?.MainReducerApp));
    const {i18n}=useTranslation();

    const SarchDataFilter=useMemo(()=>{
      const placeData = DataUsePlaceSearch.GetSelectPlaceData({ PlaceSelect });
      let SelectObjectPlace:any=DataUsePlaceSearch.GetObjectPlaceSend({ModalView:DataPasingFromModal,PlaceSelect:placeData,i18n});

      return {
        listLiwaOrQada:PlaceSelect?.listLiwaOrQada,
        PlaceSelectMainInfo:placeData,
        PlaceSelectCode:{...SelectObjectPlace},
        filters:DataUsePlaceSearch.GetFiltersData({ModalView:DataPasingFromModal,placeData})
      }
      
    },[PlaceSelect,DataPasingFromModal]);
    
    return SarchDataFilter;
  };

export default useFilteredPlaceData;
