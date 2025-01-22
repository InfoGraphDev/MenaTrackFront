import React, { useContext, useEffect } from 'react'
import styles from "./style.module.scss";
import { Governorates_Liwa_Qada_ContextApi } from './contextApi';
import { DataUsePlaceSearch } from '@/Core/Constant/DataUse-PlaceSearch';
import ReusableInput from '@/Components/UIElements/Input';
import SkeletonComponent from '@/Components/UIElements/Feedback/Skeleton';
import { ReduxInterface } from '@/Core/interface/Redux-interface';
import { useSelector } from 'react-redux';

function Governorates_Liwa_Qada({formOptions,DataFetch,isLoading}) {
    const {GovernoratesOptions,LiwaOptions,QadaOptions,
           setGovernoratesOptions,setLiwaOptions,setQadaOptions}=useContext(Governorates_Liwa_Qada_ContextApi)
    const ShowChartAndInformation = useSelector((state: ReduxInterface) => state?.MainReducerApp?.ShowChartAndInformation);

    useEffect(()=>{
      if(DataFetch){
        setGovernoratesOptions(DataFetch.Governorates);
        setLiwaOptions(DataFetch.Liwa)
        setQadaOptions(DataFetch.Quda)
      }
    },[DataFetch])

    let ValueCheck=(number:number)=>{
        return formOptions?.watch()[DataUsePlaceSearch.Governorates_Liwa_Qada[number]?.name]
    }
  return (
    <div>
        {isLoading?<SkeletonComponent style={{height:"3rem"}}/>:
        <>
          <ReusableInput 
              type='place-select'
              Datause={DataUsePlaceSearch.Governorates_Liwa_Qada[0]} 
              formOptions={formOptions}  
              moreOptions={{passingOptions:GovernoratesOptions}} />
        </>}
       
        <div className={`${styles.SecondSearch} ${ShowChartAndInformation&&styles.activeDetailShow}`}>
          <li>
            {isLoading?<SkeletonComponent style={{height:"3rem"}}/>:
            <ReusableInput 
              type='place-select'
              Datause={DataUsePlaceSearch.Governorates_Liwa_Qada[1]} 
              disable={ValueCheck(0)==""} formOptions={formOptions} 
              moreOptions={{passingOptions:LiwaOptions}} />}</li>
          <li>
            {isLoading?<SkeletonComponent style={{height:"3rem"}}/>:
            <ReusableInput 
              type='place-select'
              Datause={DataUsePlaceSearch.Governorates_Liwa_Qada[2]} 
              disable={ValueCheck(1)==""} formOptions={formOptions} 
              moreOptions={{passingOptions:QadaOptions}}/>}</li>
        </div>
    </div>
  )
}

export default Governorates_Liwa_Qada
