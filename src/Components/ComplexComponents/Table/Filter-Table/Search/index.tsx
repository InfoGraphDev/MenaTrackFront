import ReusableInput from '@/Components/UIElements/Input'
import React, { useContext, useMemo, useRef } from 'react'
import { FilterTableDataUse } from './DataUse-Filter'
import  styles from "../style.module.scss";
import useIsArabicLanguage from '@/Hooks/IsArabicLanguage';
import { useTranslation } from 'react-i18next';
import { useOutsideClick } from '@/Hooks/ClickOutsideHook';
import { MainTableContext, MainTableContextInterface } from '../..';

function SearchComponent({formOptions,setOpenFilter}) {
  const {ColumnsWillUseForTable}=useContext<MainTableContextInterface>(MainTableContext);
    const filterRef=useRef(null);
    useOutsideClick(filterRef, () => setOpenFilter(false));  
    const {t}=useTranslation();
    const isArabicLanguage=useIsArabicLanguage();

    const options = useMemo(() => {
        const filteredOptions = ColumnsWillUseForTable?.filter((MainData: any) => MainData?.accessorKey !== ""&&MainData?.filter!==false)
            ?.map((data: any) => ({ label: data?.header, value:`${data?.perant?`${data?.perant}.`:""}${data?.accessorKey}`   }));
        return [ ...filteredOptions];
    }, [ColumnsWillUseForTable]);

  return (
    <div className={styles.filterContainer} style={isArabicLanguage?{left:"0"}:{right:"0"}} ref={filterRef}>
        <div><ReusableInput type='react-select' Datause={FilterTableDataUse?.DataUse(t,options)[0]} formOptions={formOptions} /></div>
        <div><ReusableInput type='text' disable={formOptions?.watch()?.filterColumn!=""&&formOptions?.watch()?.filterColumn?false:true} Datause={FilterTableDataUse?.DataUse(t,options)[1]} formOptions={formOptions} /></div>
    </div>
  )
}

export default SearchComponent
