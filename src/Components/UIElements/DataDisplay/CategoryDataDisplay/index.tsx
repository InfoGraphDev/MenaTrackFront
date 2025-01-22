import GridComponent from '@/Components/UIElements/Layout/Grid';
import React from 'react'
import { useTranslation } from 'react-i18next';
import FlexComponent from '../../Layout/Flex';
import styles from "./style.module.scss";
import ButtonComponent from '../../General/Button';
import CloseSvg from '@/Assets/Icons/Close';
import ClearSelectSvg from '@/Assets/Icons/ClearSelect';
import DeleteRecordSvg from '@/Assets/Icons/deleteRecord';

interface CategoryDataDisplay{
    CategoryData:any,
    setSelectCategoryData?:any,
    SelectCategoryData?:any,
    formOptions?:any,
    NormalRadius?:boolean
    itemOption?:{
        label:string,
        name:string
    },
}

function CategoryDataDisplay({CategoryData,setSelectCategoryData,SelectCategoryData,itemOption,formOptions,NormalRadius}:CategoryDataDisplay) {
    const {t}=useTranslation()
    const handelClick=(data)=>{
        setSelectCategoryData(data)
    }

    const HandelClickFunction=(data,name)=>{
        formOptions?.setValue(name, data?.value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
    }

    const handelClearData=()=>{
        formOptions?.setValue(itemOption?.name, null, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
    }
  return (
    <div className={styles.container}>
        <FlexComponent justifyContent='space-between'>
            <div className={styles.title}>{itemOption?.label&&<div>{t(itemOption?.label)}</div>}</div>
        </FlexComponent>
        <GridComponent columnGap='.5rem' columnWidth='10rem' rowGap='.5rem' >
            {CategoryData?.map((data:any,i:number)=>(
                <div onClick={formOptions?()=>{HandelClickFunction(data,itemOption?.name)}:()=>{handelClick(data)}} 
                     key={i} className={`${styles.item} 
                     ${SelectCategoryData?.value==data?.value&&styles.active} 
                     ${formOptions?.watch()[itemOption?.name]==data?.value&&styles.active}
                     ${NormalRadius&&styles.NormalRadius}`} >
                    {t(`${data?.label}`)}
                </div>
            ))}
        </GridComponent>
        {formOptions&&<ButtonComponent
            formOptions={{isSubmitting:false,isValid:formOptions?.watch()[itemOption?.name]}}
            PassingData={handelClearData} size='small' icon={<DeleteRecordSvg/>}
           text='MedicalequipmentSearch.Removeselection' style={{height:"1rem",marginTop:"1rem"}}/>}
    </div>
  )
}

export default CategoryDataDisplay
