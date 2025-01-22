import React, { useMemo, useState } from 'react'
import styles from "./style.module.scss";
import { useTranslation } from 'react-i18next';
import { ExportExcel } from '@/Utils/exportExcel';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import { useNotification } from '../../Notifications';
import FilterSvg from '@/Assets/Icons/filter';
import ExcelSvg from '@/Assets/Icons/excel';
import SelectColumnFilterComponent from './SelectColumn';
import SearchComponent from './Search';
import SelectShowSvg from '@/Assets/Icons/SelectShow';

interface FilterTableReactTableProps {
  Data: any[];
  formOptions: any;
  totalItems: number;
  Type:'server-side'|'client-side',
  showAllRecord?:boolean,
  keysToRemove?:any,
  table:any,
  withoutTitleFilter?:boolean
}

function FilterTableReactTable({Data,formOptions,totalItems,Type,showAllRecord,keysToRemove,table,withoutTitleFilter}:FilterTableReactTableProps) {
  const { t } = useTranslation();
  const addNotification=useNotification();
  const [OpenFilter,setOpenFilter]=useState(false)
  const [SelectColumnFilter,setSelectColumnFilter]=useState(false);

  const transformTableData = (tableConfig) => {
    const {
      options: { data, columns },
    } = tableConfig;
  
    // Transform data to the format required by your requirements
    const transformedData = data.map((row) => {
      let transformedRow = {};
      columns.forEach((column) => {
        if (column.accessorKey !== 'actions') {
          if (column.cell) {
            // Create a mock param object
            const param = {
              row,
              value: row[column.accessorKey],
              column,
            };
            const cellValue = column.cell(param);            
            if (React.isValidElement(cellValue)) {
              transformedRow[column.header] = cellValue.props;
            } else {
              transformedRow[column.header] = cellValue;
            }
          } else {
            transformedRow[column.header] = row[column.accessorKey];
          }
        }
      });
      return transformedRow;
    });
  
    return transformedData;
  };
            
 let DataFile=useMemo(()=>{
    if(showAllRecord){
     return [{title:t("common.ExportExcel"),icon:<ExcelSvg/>,type:1}]
    }else{
     return [
        {title:t("common.ExportExcel"),icon:<ExcelSvg/>,type:1},
        {title:t("common.Filter"),icon:<FilterSvg/>,type:2},
        {title:t("تحديد العناصر"),icon:<SelectShowSvg/>,type:3}
      ]
    }
  },[showAllRecord])

    const handelClick=(type:number)=>{
      if(type===1){
        if(Data?.length===0){
          addNotification({message:"error.Youhavenodatatoexport",type:"fail"})
        }else{
          ExportExcel({data:transformTableData(table),keysToRemove,nameExcel:"Employee File"})
        }
      }else if((type===2)){
        setOpenFilter(true)
      }else if(type===3){
        setSelectColumnFilter(true)
      }
    }

  return (
    <FlexComponent className={styles.container} justifyContent='space-between' alignItems='baseline' style={{marginBottom:".5rem"}}>
        <div className={styles.text}>{t("")}</div>
        <FlexComponent gap='.5rem'>
            {DataFile?.map(({icon,title,type},i
            )=>(<FlexComponent gap='.5rem' className={styles.containerIcon} key={i} >
                {(type===2&&OpenFilter)&&
                  <SearchComponent 
                    formOptions={formOptions} 
                    setOpenFilter={setOpenFilter}/>}
                  {type===3&&SelectColumnFilter&&
                    <SelectColumnFilterComponent 
                      setSelectColumnFilter={setSelectColumnFilter} />}
                  <div>
                    <FlexComponent gap='.5rem' className={`${styles.icon} ${withoutTitleFilter&&styles.iconSpecialView}`} title={title} key={i} onClick={()=>{handelClick(type)}}>
                      <span className={`${styles.titleIcon} ${withoutTitleFilter&&styles.titleIconWithout}`}>{title}</span>
                      <span className={styles.icons}>{icon}</span>
                    </FlexComponent>
                  </div>
              </FlexComponent>
              ))}
        </FlexComponent>
    </FlexComponent>
  )
}

export default FilterTableReactTable
