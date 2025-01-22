import React, { useEffect, useMemo, useState } from 'react';
import {
  getCoreRowModel,
  useReactTable, 
} from '@tanstack/react-table';
import styles from  "./style.module.scss";
import PaginationReactTable from './pagination/pagination';
import HeaderReactTable from './Header-Table/Header-React-table';
import BodyReactTable from './Body-Table/Body-Table';
import { useForm } from 'react-hook-form';
import { DefaultTableValue, TableEnum } from '@/Core/Enums/EnumTable';
import FilterTableReactTable from './Filter-Table/Filter-Table';

interface BaseReactTable {
  Data: object[];
  loading: boolean;
  columns: object[];
  height?: string;
  showAllRecord?:boolean,
  keysToRemove?:any,
  addSumationFeild?:string,
  emptyMessage?:string,
  WithoutSelectColumn?:boolean,
  nameExcel?:string,
  setPassingColumnValue?:any,
  refetchFeild?:string,
  SpecialViewIcon?:boolean,
  withoutTitleFilter?:boolean
}

interface ServerSideReactTable extends BaseReactTable {
  Type: 'server-side';
  SetServerSideOption:any;
  ServerSideOption:any 
  countServerSide:number;
}

interface ClientSideReactTable extends BaseReactTable {
  Type: 'client-side';
}
type ReactTable = ServerSideReactTable | ClientSideReactTable;

function ReactTable({
        Data:DataMain,Type="client-side",setPassingColumnValue,
        loading,columns,height="13.3rem",emptyMessage,SpecialViewIcon,
        SetServerSideOption,ServerSideOption,WithoutSelectColumn,
        countServerSide,showAllRecord,keysToRemove,addSumationFeild,nameExcel,refetchFeild,withoutTitleFilter}:ReactTable) {
          const [DataRow, setDataRow] = useState(DataMain || []);
          const [CountInCleinSide,setCountInCleinSide]=useState(false);

  const [CoulumnsValue,setCoulumnsValue]=useState(columns);



  useEffect(()=>{
    setCoulumnsValue(columns);
  },[JSON.stringify(columns)]);  
  
  const ColumnsWillUseForTable=useMemo(()=>{
    if(WithoutSelectColumn){
      return CoulumnsValue
    }else{
      return(CoulumnsValue?.filter((data)=>(data?.active==true)));
    }
  },[CoulumnsValue]);


  const table = useReactTable({
    data:DataRow,
    columns:ColumnsWillUseForTable,
    getCoreRowModel: getCoreRowModel(),
  });
  
  const formOptions:any = useForm<FormData>({
    mode: 'onChange',
    defaultValues: DefaultTableValue
  });
  

  useEffect(()=>{
    if(showAllRecord){
      formOptions?.setValue(TableEnum[0], Number(100000), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
        exact: false
      });  
    }
  },[showAllRecord])

  useEffect(() => {
    if (Type === "client-side" && Array.isArray(DataMain)) {
      let updatedData = [...DataMain]; 
      setCountInCleinSide(false)
      // Sorting
      const sortBy = formOptions?.watch(TableEnum[2]);
      const fieldSort = formOptions?.watch(TableEnum[3]);
      if (sortBy !== "" && fieldSort !== "") {
        updatedData.sort((a, b) => {
          if (sortBy === 'ASC') {
            return a[fieldSort] > b[fieldSort] ? 1 : -1;
          } else {
            return a[fieldSort] < b[fieldSort] ? 1 : -1;
          }
        });
      }

      // Filtering
      const fieldFilter = formOptions?.watch(TableEnum[4])?.trim().toLowerCase();
      const filterColumn = formOptions?.watch(TableEnum[5]);
      if (fieldFilter && filterColumn) {
        const searchTerms = fieldFilter.split(/\s+/);
        updatedData = updatedData.filter((data:any) => {
          const value = data[filterColumn];
          if (value === undefined || value === null) {
            return false; 
          }
          const valueStr = String(value).toLowerCase();
          return searchTerms.every((term:any) => valueStr.includes(term));
        });
        setCountInCleinSide(updatedData)
      }
      
      // Pagination
      const start = (formOptions?.watch(TableEnum[1]) - 1) * formOptions?.watch(TableEnum[0]);
      const end = formOptions?.watch(TableEnum[1]) * formOptions?.watch(TableEnum[0]);
      updatedData = updatedData.slice(start, end);

      setDataRow(updatedData);
    } else{
      if(DataMain){
        if(DataMain?.length>0){
          setDataRow(DataMain);
        }else{
          setDataRow([]);
        }
      }
    }
  }, [JSON.stringify(formOptions.watch()), JSON.stringify(DataMain)]);

  useEffect(()=>{
    if (Type === "server-side"){
      // Server-side logic
      let Data=formOptions?.watch();
      let requestData:any = {
        PageNumber: Data?.pageNumber,
        PageSize: Data?.pageSize,
        SortBy: Data?.fieldSort || "id",
        SortType: Data?.sortBy || "DESC"
      };      
      if(Data?.filterColumn!==""&&Data?.fieldFilter!==""){
        requestData["filters"]=[
          {
            propertyName: Data?.filterColumn==""?null:Data?.filterColumn,
            operation: 0,
            value: Data?.fieldFilter==""?null:Data?.fieldFilter
          }
        ]
      }
  
      if(JSON.stringify(ServerSideOption)!==JSON.stringify(requestData)){
        SetServerSideOption(requestData);
      }
    }
  },[JSON.stringify(formOptions.watch())])

  let TotalCount = 0;
  if(Type === "server-side"){
    TotalCount=countServerSide;
  }else{
    if(CountInCleinSide==false){
      TotalCount=DataMain?.length;
    }else{
      TotalCount=CountInCleinSide?.length;
    }
  }

  return (
    <MainTableContext.Provider value={{CoulumnsValue,setCoulumnsValue,ColumnsWillUseForTable}}>
      <form>
        <FilterTableReactTable 
          SpecialViewIcon={SpecialViewIcon}
          refetchFeild={refetchFeild}
          showAllRecord={showAllRecord} Type={Type} totalItems={TotalCount} 
          Data={DataMain} formOptions={formOptions} 
          keysToRemove={keysToRemove}
          table={table} 
          nameExcel={nameExcel}
          CoulumnsValue={CoulumnsValue}
          withoutTitleFilter={withoutTitleFilter}
          />
        <div className={styles.table} style={{height:height}}>
          <HeaderReactTable 
            ColumnsWillUseForTable={ColumnsWillUseForTable} 
            table={table} formOptions={formOptions}/>
          <BodyReactTable  
            DataRow={DataRow} height={height} 
            emptyMessage={emptyMessage}
            table={table} loading={loading} 
            addSumationFeild={addSumationFeild}/>
        </div>
        <div style={{visibility:(table?.getRowModel()?.rows?.length>0&&!loading)?"visible":"hidden"}}>
          {!showAllRecord&&
              <PaginationReactTable Type={Type} DataMain={DataMain} formOptions={formOptions} totalItems={TotalCount}/>}
        </div>
      </form>
    </MainTableContext.Provider>
  );
}

export default ReactTable;

export interface MainTableContextInterface{
  CoulumnsValue:any,
  setCoulumnsValue:any,
  ColumnsWillUseForTable:any
}
export const MainTableContext=React.createContext<MainTableContextInterface>({
  CoulumnsValue:[],
  setCoulumnsValue:()=>{},
  ColumnsWillUseForTable:[]
})